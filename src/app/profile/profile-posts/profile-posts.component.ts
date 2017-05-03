import { Component, OnInit } from '@angular/core';
import { FeedComponent } from 'app/shared/feed/feed.component';
import { Post } from 'app/services/objects/post';


@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //console.log('loaded app-profile-posts');
  }

}
