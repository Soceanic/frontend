import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  page: string;
  public sidebar;
  public profileLink;
  urlSub;
  private url: string;

  //sidebar uses anchor-relative naviagtion
  private sideLinks = {
    'landing': {
      links: [
        {name: 'Home', link: '#home'},
        {name: 'About', link: '#about'}
      ]
    },
    'feed': {
      links: [
        {name: 'My Feed', link: '#feed'},
        {name: 'Groups', link: '#groups'}
      ]
    },
    'profile': {
      links: [
        {name: 'Profile', link: '#profile'},
        {name: 'Posts', link: '#posts'},
        {name: 'Friends', link: '#friends'}
      ]
    }
  }

  constructor(private service: AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.urlSub = this.route.url.subscribe(
      url => {
        this.url = url[0].path;
        console.log(url);
        console.log('current path:', this.url);
        if(this.url === 'feed'){
          this.page = 'feed';
        }else if(this.url === 'profile'){
          this.page = 'profile';
        }else{
          this.page = 'landing';
        }
      },
      err => {
        console.log('error getting current url in nav component', err);
      }
    );

    if(localStorage.getItem('currentUser')){
      this.profileLink = `/profile/${localStorage.getItem('currentUser')['username']}`;
    }
    this.sidebar = this.sideLinks[this.page];
  }

  logout(){
    this.service.logout();
    this.router.navigateByUrl('');
  }

}
