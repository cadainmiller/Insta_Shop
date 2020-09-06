import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

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
      (error: any) => {
        this.submitted = true;
        console.log(error);
        this.errorMessage = 'Email or Password incorrect.';
      }
    );
  }
}
