import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interfaces';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  Users: any = [];
  userForm!: FormGroup;
  userObj: Users;
  updateUser: any = [];
  userId: any;
  rol: any = [];

  errorMessage = '';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    identidad: new FormControl(''),
    gerencia: new FormControl(''),
    roles: new FormControl(''),
  });
  submitted = false;

  formUpdate: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    identidad: new FormControl(''),
    gerencia: new FormControl(''),
    roles: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private user: UserService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

    this.userForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      identidad: new FormControl('', [Validators.required]),
      gerencia: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
    });

    this.userObj = new Users();


  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        identidad: ['', [Validators.required]],
        gerencia: ['', [Validators.required]],
        roles: ['', [Validators.required]],
      },
    );

    this.formUpdate = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        identidad: ['', [Validators.required]],
        gerencia: ['', [Validators.required]],
        roles: ['', [Validators.required]],
      },
    );


    this.user.getUsers().subscribe(
      (res) => {
        this.Users = res;
        // console.log(this.Users);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // abre el modal1
  open(content: any) {
    this.modalService.open(content);
  }

  // abre el modal2
  open2(content2: any) {
    this.modalService.open(content2);
  }

  //cierra el modal
  close() {
    this.modalService.dismissAll();
  }


  // Create user
  onSubmit(): void {
    this.submitted = true;

    this.rol = this.form.value.roles === "moderator" ? ["moderator"] : this.form.value.roles === "admin" ? ["admin"] : [];

    const data = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      identidad: this.form.value.identidad,
      gerencia: this.form.value.gerencia,
      roles: this.rol,

    };
    // console.log(data)

    this.auth.signup(data).subscribe(
      (res) => {
        // console.log(res);
        this.close();
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );

  }

  // Get user by ID
  upUser(id: string) {
    this.user.getUserById(id).subscribe(
      (res) => {
        console.log(res)
        this.userId = res._id;
        this.updateUser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // Delete user  
 delUser(id: string) {
    try {
      // preguntar si esta seguro de eliminar
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        this.user.deleteUser(id).subscribe(
          (res) => {
            // console.log(res);
            this.ngOnInit();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  // editar usuario
  onUpdate(){
    const data = {
      id: this.userId,
      username: this.formUpdate.value.username,
      email: this.formUpdate.value.email,
      password: this.formUpdate.value.password,
      identidad: this.formUpdate.value.identidad,
      gerencia: this.formUpdate.value.gerencia,
      roles: this.formUpdate.value.roles,
    };
    // console.log(data)
    this.user.updateUser(data).subscribe(
      (res) => {
        //
        alert('Usuario actualizado');

        //console.log(res);
        this.close();
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  
  }

}


// interface Users 
export class Users {
  username: string;
  email: string;
  password: string;
  identidad: string;
  gerencia: string;
  roles: string;
  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.identidad = '';
    this.gerencia = '';
    this.roles = '';
  }
}
