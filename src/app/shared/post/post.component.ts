import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/services/objects/post';
import { PostService } from 'app/services/post.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post;
  constructor(private service: PostService, public snackBar: MdSnackBar) { }

  ngOnInit() {

  }

  save(id){
    const curruser = localStorage.getItem('currentUser')['username'];
    this.service.save(curruser, id)
                .subscribe(
                  status => {
                    if(status === true){
                      let snackbar = this.snackBar.open('Post saved', 'Ok',
                        {duration: 3000});
                    }
                  },
                  err => {
                    let snackbar = this.snackBar.open('Error saving post', 'Ok',
                      {duration: 3000});
                    console.log('error saving a post in post component', err);
                  }
                );
  }

  like(id){
    const curruser = localStorage.getItem('currentUser')['username'];
    this.service.upvote(curruser, id)
                .subscribe(
                  status => {
                    if(status === true){
                      this.reload(id);
                    }
                  },
                  err => {
                    console.log('error liking a post in post component', err);
                  }
                );
  }

  private reload(id){
    this.service.get(id)
                .subscribe(
                  post => {
                    this.post.likes = post.likes;
                  },
                  err => {
                    console.log('error updating likes in post component', err);
                  }
                );
  }

}
