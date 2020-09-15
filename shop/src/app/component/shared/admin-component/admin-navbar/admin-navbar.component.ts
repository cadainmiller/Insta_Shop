import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SettingsComponent } from '../../dialog/settings/settings.component';
import { ProfileComponent } from '../../dialog/profile/profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent implements OnInit {
  bsModalRef: BsModalRef;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private router: Router
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
    const initialState = {
      title: 'Profile',
    };
    this.bsModalRef = this.modalService.show(ProfileComponent, {
      initialState,
      class: 'modal-lg modal-dialog-centered',
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
