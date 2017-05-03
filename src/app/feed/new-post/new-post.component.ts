import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
