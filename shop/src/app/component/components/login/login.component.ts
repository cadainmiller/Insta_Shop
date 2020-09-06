import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  submitted = false;
  errorMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  loginBtn() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
    }
    this.submitted = false;
    this.userService.loginUser(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('Token', data.token);
        //this.router.navigateByUrl('/');
      },
      (err: HttpErrorResponse) => {
        this.submitted = true;
        console.log(err.error);
        if (err.error.msg) {
          this.errorMessage = err.error.msg;
        } else {
          this.errorMessage = 'Something Went Wrong!';
        }
      }
    );
  }
}
