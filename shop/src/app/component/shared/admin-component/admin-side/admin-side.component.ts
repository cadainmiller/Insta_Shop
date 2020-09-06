import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-side',
  templateUrl: './admin-side.component.html',
  styleUrls: ['./admin-side.component.scss'],
})
export class AdminSideComponent implements OnInit {
  name = '';
  email = '';
  constructor() {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('UserInfo'));
    console.log(user)
    this.name = user.name;
    this.email = user.email;
  }
}
