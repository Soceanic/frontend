import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from 'app/services/auth.service';
import { Login } from 'app/services/objects/login';

import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private _login: Login;
  form: FormGroup;
  submitted: boolean = false;
  err = null;

  constructor(private service: AuthService, private fb: FormBuilder,
    private router: Router, public snackbar: MdSnackBar) { }

  ngOnInit() {
    this._login = new Login();
    this.buildForm();
  }

  ngOnDestroy() {
    this._login = null;
  }

  buildForm(): void {
    this.form = this.fb.group({
      'username': [this._login.username,
        [
          Validators.required
        ]
      ],
      'password': [this._login.password,
        [
          Validators.required
        ]
      ]
    });

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.formErrors) {
      // Clear previous error message if there is one
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'username': '',
    'password': ''
  }

  validationMessages = {
    'username': {
      'required': 'Username is required'
    },
    'password': {
      'required': 'Password is required'
    }
  }

  login() {
    this.submitted = true;
    this._login = this.form.getRawValue();
    this.service.login(this._login)
                .subscribe(
                  result => {
                    //console.log(result);
                    if (result == true) {
                      //console.log(localStorage.getItem('currentUser'));
                      this.router.navigateByUrl('/feed');
                    } else {
                      this.snackbar.open('Error logging on, are you using the right userpass?', '', {
                        duration: 5000
                      });
                    }
                  },
                  err => {
                    this.snackbar.open('Error logging on, are you using the right userpass?', '', {
                      duration: 5000
                    });
                  }
                );
  }
}
