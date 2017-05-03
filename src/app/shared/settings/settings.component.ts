import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { User } from 'app/services/objects/user';
import { SettingsService } from 'app/services/settings.service';
import { Settings } from 'app/services/objects/settings';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public uploadUrl: string = 'http://soceanic.me/api/upload';
  private set: Settings;
  form: FormGroup;
  private submitted: boolean = false;
  private image = undefined;

  constructor(private service: SettingsService,private fb: FormBuilder,
    private router: Router, public snackbar: MdSnackBar) { }

  ngOnInit() {
    this.set = new Settings();
    this.buildForm();
  }

  ngOnDestroy() {
    this.set = null;
  }

  buildForm(): void {
    this.form = this.fb.group({
    'password': [this.set.password,
      [
        Validators.minLength(8)
      ]
    ],
    'email': [this.set.email,
      [
        Validators.email
      ]
    ]
  });

  this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged(); // (re)set validation messages now
}

onValueChanged(data?: any) {
  if (!this.form) { return; }
  const form = this.form;
  for (const field in this.formErrors) {
    // clear previous error message (if any)
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
  'password': '',
  'email': ''
};

validationMessages = {
  'password': {
    'required': 'Password is required',
    'minLength': 'Password must be at least 8 characters'
  },
  'email': {
    'required': 'Email is required',
    'email': 'Invalid email'
  }
  }

  modifySettings(){
    this.submitted = true;
    this.set = this.form.value;
    this.service.settings(this.set)
                .subscribe(
                  user => {
                    console.log(user);
                    let snackbar = this.snackbar.open('User has been successfully modified.', '', {
                      duration: 5000
                    });
                  },
                  error => {
                    console.log(error);
                    this.snackbar.open('Error changing settings', '', {
                      duration: 5000
                    });
                  }
                );

    }

    imageUploaded(event){
      let res = JSON.parse(event.serverResponse._body);
      console.log('Image uploading response: ', res);
      this.image = res.path;
      console.log('image url hopefully', this.image);
    }
}
