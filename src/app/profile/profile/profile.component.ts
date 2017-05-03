import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from 'app/services/profile.service';
import { FriendsService } from 'app/services/friends.service';
import { User } from 'app/services/objects/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  username;
  user?: User;
  private profileSub;
  private urlSub;
  curruser? = JSON.parse(localStorage.getItem('currentUser')).username;


  constructor(private route: ActivatedRoute, private service: ProfileService,
    private fservice: FriendsService) { }

  ngOnInit() {
    this.urlSub = this.route.paramMap.subscribe(
      paramMap => {
        this.username = paramMap.get('name');
        //console.log(this.username);
      },
      err => {
        //console.log('error getting url params in profile component', err);
      }
    );

    this.profileSub = this.service.getProfile(this.username)
                .subscribe(
                  user => {
                    this.user = user;
                  },
                  err => {
                    //console.log('error gettng user in profile component', err);
                  }
                );

  }

  ngOnDestroy(){
    this.profileSub.unsubscribe();
    this.urlSub.unsubscribe();
  }

  addFriend(){
    this.fservice.request(this.username)
                 .subscribe(
                   res => {
                     return res;
                   },
                   err => {
                     //console.log('error requesting friend', err);
                   }
                 );
  }

}
