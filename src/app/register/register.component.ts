import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import { Router, CanDeactivate } from '@angular/router';
import { DialogService } from '../dialog/dialog.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  @ViewChild('form')
  userForm: FormGroup;

  constructor(private authService: AuthService, private route: Router, private dialogService: DialogService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    this.signupInfo = new SignUpInfo(
      formValue['name'],
      formValue['username'],
      formValue['email'],
      formValue['password']
    );

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

    if (this.userForm.dirty) {
      return this.dialogService.confirm('You have unsaved changes! If you leave, your changes will be lost.');
    }
    return true;
  }

}
