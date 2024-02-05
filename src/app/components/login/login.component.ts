import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// o
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AccesspointService } from '../../services/accesspoint.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule, NgbAlertModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  loginObj: Login;
  token!: string | null;

  isLoginFailed = false;
  isLoggedIn = false;
  roles: string[] = [];
  errorMessage = '';

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false; 





  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private accesspointService: AccesspointService,
    private router: Router,
    private fb : FormBuilder
    ) {
      this.loginForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
      });

    this.loginObj = new Login();
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  

  close() {}

  onSubmit(): void {
    this.submitted = true;

    const data = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.signin(data).subscribe(
      res => {
        if (res.accessToken) {
          localStorage.setItem('token',res.accessToken); // * Guardando token en localStorage
          localStorage.setItem('auth-user', JSON.stringify(res)); // * Guardando token en localStorage
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          // this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/dashboard']);
          
        }else if(res.message){
          this.errorMessage = res.message;
          this.isLoginFailed = false;
        }

        // this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
      );
  }

  reloadPage(): void {
    window.location.reload();
  }
}

export class Login {
  email: string;
  password: string;
  constructor() {
    this.email = '';
    this.password = '';
  }
}
