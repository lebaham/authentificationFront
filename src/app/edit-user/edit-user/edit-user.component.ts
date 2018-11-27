import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  message: string;
  submitted = false;

  constructor(private route: ActivatedRoute,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { user: User }) => {
      this.user = data.user;
    });
  }

  update(): void {
    this.userService.updateUser(this.user).subscribe(() => {
      this.message = 'Customer Updated Successfully!';
      this.router.navigate(['home', { id: this.user.id}]);
    }
    );
  }

}
