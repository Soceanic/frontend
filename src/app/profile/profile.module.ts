import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';

import { ProfileService } from 'app/services/profile.service';
import { User } from 'app/services/objects/user';

import { FeedService } from 'app/services/feed.service';
import { Post } from 'app/services/objects/post';

import { SharedModule } from 'app/shared/shared.module';
import { FriendComponent } from './friend/friend.component';
import { FriendsService } from 'app/services/friends.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ProfileComponent, ProfilePostsComponent, ProfileFriendsComponent, FriendComponent],
  exports: [ProfileComponent],
  providers: [ProfileService, FeedService, User, Post, FriendsService]
})
export class ProfileModule { }
