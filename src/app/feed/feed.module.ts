import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFeedComponent } from './my-feed/my-feed.component';
import { GroupsComponent } from './groups/groups.component';
import { NewPostComponent } from './new-post/new-post.component';

import { PostService } from 'app/services/post.service';
import { Post } from 'app/services/objects/post';
import { FeedService } from 'app/services/feed.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyFeedComponent, GroupsComponent, NewPostComponent]
})
export class FeedModule { }
