import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFeedComponent } from './my-feed/my-feed.component';
import { GroupsComponent } from './groups/groups.component';
import { NewPostComponent } from './new-post/new-post.component';

import { PostService } from 'app/services/post.service';
import { Post } from 'app/services/objects/post';
import { FeedService } from 'app/services/feed.service';
import { SharedModule } from 'app/shared/shared.module';

import { MdDialogModule } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

import { ImageUploadModule } from 'angular2-image-upload';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    ReactiveFormsModule,
    SharedModule, ImageUploadModule
  ],
  declarations: [MyFeedComponent, GroupsComponent, NewPostComponent],
  exports: [MyFeedComponent],
  providers: [PostService, FeedService]
})
export class FeedModule { }
