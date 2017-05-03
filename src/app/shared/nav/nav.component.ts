import { Component, Input, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements DoCheck {
  page: string;
  public sidebar;
  public profileLink = undefined;
  urlSub;
  private url: string;


  //sidebar uses anchor-relative naviagtion


  constructor(private service: AuthService, private router: Router,
    private route: ActivatedRoute) { }


    ngDoCheck(){
      if(this.route.snapshot.children[0]){
        if(this.route.snapshot.children[0].url[0]){
        //console.log(this.route.snapshot.children[0].url[0].path);
        this.url = this.route.snapshot.children[0].url[0].path;
        if(this.url === 'feed'){
          this.page = 'feed';
        }else if(this.url === 'profile'){
          this.page = 'profile';
        }
      }
      if(localStorage.getItem('currentUser')){
        this.profileLink = `/profile/${JSON.parse(localStorage.getItem('currentUser')).username}`;
        //console.log(this.profileLink);
      }
    }else{
      this.page = 'landing';
    }
    let sideLinks = {
      'landing': {
        links: [
          {name: 'Home', link: '#home'},
          {name: 'About', link: '#about'}
        ]
      },
      'feed': {
        links: [
          {name: 'My Feed', link: '/feed'},
          {name: 'Groups', link: '/feed#groups'}
        ]
      },
      'profile': {
        links: [
          {name: 'Profile', link: `${this.profileLink}`},
          {name: 'Posts', link: `${this.profileLink}#posts`},
          {name: 'Friends', link: `${this.profileLink}#friends`}
        ]
      }
    }

    this.sidebar = sideLinks[this.page];
  }

  }
