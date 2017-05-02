import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { NavComponent } from './nav/nav.component';
import { PostComponent } from './post/post.component';

import { AuthService } from 'app/services/auth.service';
import { PostService } from 'app/services/post.service';
import { FeedService } from 'app/services/feed.service';

import { Post } from 'app/services/objects/post';
import { User } from 'app/services/objects/user'

import { MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdSnackBarModule
  ],
  declarations: [
    FeedComponent,
    NavComponent,
    PostComponent
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
    User
  ]
})
export class SharedModule { }
