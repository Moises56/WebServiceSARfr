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

  errorMessage = '';
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    roles: new FormControl(''),
  });
  submitted = false;

  formUpdate: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    roles: new FormControl(''),
  });

  constructor(
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

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  open(content: any) {
    this.modalService.open(content);
  }
  open2(content2: any) {
    this.modalService.open(content2);
  }

  close() {
    this.modalService.dismissAll();
  }

  onSubmit(): void {
    this.submitted = true;

    const data = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      roles: this.form.value.roles,
    };
    console.log(data)
    this.user.createUser(data).subscribe(
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

  upUser(id: string) {
    this.user.getUserById(id).subscribe(
      (res) => {
        // console.log(res._id)
        this.userId = res._id;
        this.updateUser = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
 delUser(id: string) {
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

  onUpdate(){
    const data = {
      id: this.userId,
      username: this.formUpdate.value.username,
      email: this.formUpdate.value.email,
      password: this.formUpdate.value.password,
      roles: this.formUpdate.value.roles,
    };
    console.log(data)
    this.user.updateUser(data).subscribe(
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

}


export class Users {
  username: string;
  email: string;
  password: string;
  roles: string;
  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.roles = '';
  }
}
