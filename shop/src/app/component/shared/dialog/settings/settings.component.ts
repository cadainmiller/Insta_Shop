import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/component/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  userInfo = [];

  constructor(private userService: UserService) {
    this.userService.getProtectedData().subscribe((data) => {
      this.userInfo = data.users;
    });
  }

  ngOnInit(): void {
  }
}
