import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerServiceService } from '../pagination/pager-service.service';

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
  // pager object
  pager: any = {};
  page = 0;
  firstPage = 1;
  selectedId: number;
   // paged items
   pagedItems: User[];

  constructor(private token: TokenStorageService, private userService: UserService,
    private router: Router, private pagerService: PagerServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId = params['id'];
      this.loadAllUsers();
    });
  }

  logout() {
    this.token.signOut();
  }

  private loadAllUsers() {
    if (this.token.getToken()) {
      this.userService.allUsers().subscribe(data => {
        data.forEach(user => {
          this.users.push(user);
          // initialize to page 1
          this.setPage(1);
        });
      });
    }

  }

  onChange(user: User, isChecked: boolean) {
    if (isChecked) {
      this.listUsers.push(user);
    } else {
      this.index = this.listUsers.findIndex(x => x === user);
      this.listUsers.splice(this.index, this.firstPage);
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
        this.userService.deleteUser(user.id).subscribe(data => {
          this.users = this.users.filter(u => u !== user);
        });
      });
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.length, page);
    // get current page of items
    this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
