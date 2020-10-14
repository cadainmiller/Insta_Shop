import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserService } from 'src/app/component/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  title: string;
  obj: any;
  
  constructor(private userService: UserService) {}

  ProfileForm = new FormGroup({});

  ngOnInit(): void {
    console.log(this.obj)
  }
}
