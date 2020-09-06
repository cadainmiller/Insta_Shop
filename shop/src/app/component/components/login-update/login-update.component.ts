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
  selector: 'app-login-update',
  templateUrl: './login-update.component.html',
  styleUrls: ['./login-update.component.scss'],
})
export class LoginUpdateComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: UserService
  ) {}

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  loginBtn() {
    if (this.loginForm.invalid) {
    }
    this.submitted = false;

    this.loginService.loginUser(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        // localStorage.setItem('access_token', data.accessToken);
        // this.router.navigateByUrl('/');
      },
      (error: any) => {
        this.submitted = true;
        console.log(error);
        this.errorMessage = 'Email or Password incorrect.';
      }
    );
  }
}
