import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/services/objects/user';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  @Input() friend: User;

  constructor() { }

  ngOnInit() {
  }

}
