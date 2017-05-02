import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileComponent, ProfilePostsComponent, ProfileFriendsComponent]
})
export class ProfileModule { }
