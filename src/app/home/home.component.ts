import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { UserService } from '../services/user.service';
import { AuthLoginInfo } from '../auth/login-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  users: AuthLoginInfo[] = [];

  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  logout() {
    this.token.signOut();
  }

  private loadAllUsers() {
    if (this.token.getToken()) {
      this.userService.allUsers().subscribe(data => {
        data.forEach(user => {
          this.users.push(user);
        });
      });
    }

  }
}
