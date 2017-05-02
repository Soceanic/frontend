import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';

import { LandingModule } from 'app/landing/landing.module';
import { LandingComponent } from 'app/landing/landing/landing.component';

import { SharedModule } from 'app/shared/shared.module';

import { ProfileModule } from 'app/profile/profile.module';
import { ProfileComponent } from 'app/profile/profile/profile.component';

import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'profile/:name', component: ProfileComponent }

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    LandingModule,
    SharedModule,
    Ng2PageScrollModule.forRoot(),
    BrowserAnimationsModule,
    MdSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
