import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import { Router, CanDeactivate } from '@angular/router';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { DialogService } from '../dialog/dialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private route: Router, private dialogService: DialogService) { }

  ngOnInit() { }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {

    if (this.form.dirty) {
      console.log(this.form.dirty);
        return this.dialogService.confirm('le formulaire a été modifié');
    }
    return true;
}

}
