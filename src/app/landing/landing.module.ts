import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { RegistrationService } from 'app/services/registration.service';

import { ReactiveFormsModule } from '@angular/forms';

import { MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdSnackBarModule
  ],
  declarations: [LandingComponent, LoginComponent, RegistrationComponent],
  exports: [LandingComponent],
  providers: [RegistrationService]
})
export class LandingModule { }
