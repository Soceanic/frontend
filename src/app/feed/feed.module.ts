import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFeedComponent } from './my-feed/my-feed.component';
import { GroupsComponent } from './groups/groups.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyFeedComponent, GroupsComponent]
})
export class FeedModule { }
