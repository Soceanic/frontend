import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() page: string;

  public sidebar;
  public profileLink = `/profile/${localStorage.getItem('currentUser')['username']}`;

  //sidebar uses anchor-relative naviagtion
  private sideLinks = {
    'landing': {
      links: [
        {name: 'Home', link: '#home'},
        {name: 'Register', link: '#registration'},
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

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
    this.sidebar = this.sideLinks[this.page];
  }

  logout(){
    this.service.logout();
    this.router.navigateByUrl('');
  }

}
