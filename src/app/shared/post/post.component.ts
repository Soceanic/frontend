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

  private curruser: string;

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.curruser = JSON.parse(localStorage.getItem('currentUser')).username;
    }
  }

  save(){
    //console.log(`Post post_id being saved: ${this.post.post_id}`);

    this.service.save(this.curruser, +this.post.post_id)
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
                    //console.log('error saving a post in post component', err);
                  }
                );
  }

  like(){
    //console.log(`Post post_id being liked: ${this.post.post_id}`);
    this.service.upvote(this.curruser, +this.post.post_id)
                .subscribe(
                  status => {
                    if(status === true){
                      this.reload();
                    }
                  },
                  err => {
                    //console.log('error liking a post in post component', err);
                  }
                );
  }

  private reload(){
    this.service.get(this.post.post_id)
                .subscribe(
                  post => {
                    //console.log(post);
                    this.post.likes = post.likes;
                  },
                  err => {
                    //console.log('error updating likes in post component', err);
                  }
                );
  }

}
