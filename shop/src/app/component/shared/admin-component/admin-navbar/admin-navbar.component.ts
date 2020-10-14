import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SettingsComponent } from '../../dialog/settings/settings.component';
import { ProfileComponent } from '../../dialog/profile/profile.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/component/services/user.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent implements OnInit {
  bsModalRef: BsModalRef;
  userObj: any;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  openSettingModal() {
    const initialState = {
      title: 'Settings',
    };
    this.bsModalRef = this.modalService.show(SettingsComponent, {
      initialState,
      class: 'modal-lg modal-dialog-centered',
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openProfileModal() {
    const userCred = JSON.parse(localStorage.getItem('UserInfo'));
    this.userService.getUserBy(userCred.id).subscribe((data) => {
      const initialState = {
        title: 'Profile',
        obj: data,
      };
      this.bsModalRef = this.modalService.show(ProfileComponent, {
        initialState,
        class: 'modal-lg modal-dialog-centered',
      });
      this.bsModalRef.content.closeBtnName = 'Close';
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
