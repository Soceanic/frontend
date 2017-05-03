import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'app/services/friends.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests;

  constructor(private fservice: FriendsService) { }

  ngOnInit() {
    this.fservice.requests()
                 .subscribe(
                   res => {
                     this.requests = res;
                     //console.log(this.requests);
                   },
                   err => {
                     //console.log('error getting friend requests', err);
                   }
                 )
  }

  accept(username){
    this.fservice.respond(username, 1)
                 .subscribe(
                   res => {
                     //console.log(res);
                   },
                   err => {
                     //console.log('error accepting friend', err);
                   }
                 );
  }

  decline(username){
    this.fservice.respond(username, 2)
                 .subscribe(
                   res => {
                     //console.log(res);
                   },
                   err => {
                     //console.log('error ignoring friend', err);
                   }
                 );
  }

}
