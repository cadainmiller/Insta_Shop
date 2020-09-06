import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private userService: UserService) {}

  getProtectedData() {
    // this.userService.getProtectedData().subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  ngOnInit(): void {
    this.getProtectedData();
  }
}
