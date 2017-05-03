import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  user: string;

  constructor(private router: Router) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser')).username;
    this.user = user;
    //console.log(this.user);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/');
  }

}
