import { Component, OnInit } from '@angular/core';
import { User } from 'app/services/objects/user';
import { FriendsService } from 'app/services/friends.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {

  friends: [User];

  constructor(private service: FriendsService, private route: ActivatedRoute) { }

  ngOnInit() {
    let curruser = this.route.snapshot.params[0];
    this.service.friends(curruser)
                .subscribe(
                  friends => {
                    this.friends = friends;
                    //console.log(this.friends);
                  },
                  err => {
                    //console.log('error getting friends (rip) in profile-friends', err);
                  }
                );
  }

}
