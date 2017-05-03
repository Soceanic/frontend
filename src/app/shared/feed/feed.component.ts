import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { FeedService } from 'app/services/feed.service';
import { Post } from 'app/services/objects/post';
import { PostComponent } from 'app/shared/post/post.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input() page: string;
  feed: [Post];
  err: any = undefined;
  private urlSub: any;
  private postSub: any;

  private functions = {
    'feed': (username: string) => {
      this.postSub = this.service.getFeed(username)
                  .subscribe(
                    feed => {
                      console.log(feed);
                      this.feed = feed;
                    },
                    err => {
                      console.log('error in feed component getting feed', err);
                      this.err = err;
                    }
                  );
    },
    'profile': (username: string) => {
      this.postSub = this.service.getPosts(username)
                  .subscribe(
                    posts => {
                      console.log(posts);
                      this.feed = posts;
                    },
                    err => {
                      console.log('error in feed component getting profile', err);
                      this.err = err;
                    }
                  );
    },
    'box': (currname: string, friendname?: string) => {
      this.postSub = this.service.getBox(currname, friendname)
                  .subscribe(
                    posts => {
                      console.log(posts);
                      this.feed = posts;
                    },
                    err => {
                      console.log('error in feed component getting box', err);
                      this.err = err;
                    }
                  );
    }
  }

  constructor(private service: FeedService, private route: ActivatedRoute) { }
  //figure out what page i'm on and what to do accordingly
  ngOnInit() {
    let currname;
    if(localStorage.getItem('currentUser')) currname = localStorage.getItem('currentUser')['username'];
    let currUrl: UrlSegment[];
    this.urlSub = this.route.url.subscribe(
      url => {
        console.log('feed component is on url: ', url);
        currUrl = url;
      },
      err => {
        console.log('error getting url in feed component', err);
      }
    )

    let getter = this.functions[this.page];
    switch(this.page){
      case 'feed':
        getter(currname);
        break;
      case 'profile':
        let friendname = currUrl[1].path;
        getter(friendname);
        break;
      case 'box':
        let profilename = currUrl[1].path;
        if(profilename === currname){
          getter(currname);
        }else{
          getter(currname, profilename);
        }
    }
  }

  ngOnDestroy(){
    this.urlSub.unsubscribe();
    this.postSub.unsubscribe();
  }

}
