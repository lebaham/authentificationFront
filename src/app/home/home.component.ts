import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  users: User[] = [];
  listUsers: User[] = [];
  index: number;
  selected = false;

  constructor(private token: TokenStorageService, private userService: UserService, private router: Router) { }

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

  onChange(user: User, isChecked: boolean) {
    if (isChecked) {
      this.listUsers.push(user);
    } else {
      this.index = this.listUsers.findIndex(x => x === user);
      this.listUsers.splice(this.index, 1);
    }
  }

  selectAll(isChecked: boolean) {
    this.listUsers.pop();
    if (isChecked) {
      this.users.forEach(element => {
        this.selected = true;
        if (!this.listUsers.includes(element)) {
          this.listUsers.push(element);
        }
      });
    } else {
      this.users.forEach(element => {
        this.selected = false;
        this.listUsers.pop();
      });
    }
  }

  deleteUser() {
    if (this.listUsers.length > 0) {
      this.listUsers.forEach(user => {
        this.userService.deleteUser(user.id).subscribe( data => {
          this.users = this.users.filter(u => u !== user);
        });
      });
    }
  }

  editUser(user: User): void {
    this.router.navigate(['edit-user']);
  }
}
