import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { NavComponent } from './nav/nav.component';
import { PostComponent } from './post/post.component';

import { AuthService } from 'app/services/auth.service';
import { PostService } from 'app/services/post.service';
import { FeedService } from 'app/services/feed.service';
import { FriendsService } from 'app/services/friends.service';

import { Post } from 'app/services/objects/post';
import { User } from 'app/services/objects/user'

import { MdSnackBarModule } from '@angular/material';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SettingsComponent } from './settings/settings.component';
import { RequestsComponent } from './requests/requests.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdSnackBarModule
  ],
  declarations: [
    FeedComponent,
    NavComponent,
    PostComponent,
    TopNavComponent,
    SettingsComponent,
    RequestsComponent
  ],
  exports: [
    FeedComponent,
    NavComponent,
    PostComponent
  ],
  providers: [
    AuthService,
    PostService,
    FeedService,
    Post,
    User,
    FriendsService
  ]
})
export class SharedModule { }
