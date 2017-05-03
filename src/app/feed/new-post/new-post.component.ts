import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { MdDialog } from '@angular/material';
import { newPost } from 'app/services/objects/post';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit, OnDestroy {

  public uploadUrl: string = 'http://soceanic.me/api/upload';
  private post: newPost;
  private form: FormGroup;
  private image = undefined;

  constructor(private service: PostService, private fb: FormBuilder) { }

  ngOnInit() {
    //console.log('ayy new post!');
    this.post = new newPost();
    this.buildForm();
  }

  ngOnDestroy(){
    //console.log('well fuck you too');
    this.form = undefined;
  }

  buildForm(){
    this.form = this.fb.group(
      {
        'title': [this.post.title, Validators.required],
        'text': [this.post.text, Validators.required]
      }
    );
  }

  newPost(event){
    //console.log('new post event', event);
    event.preventDefault();
    //console.log('posting shit');
    let user = JSON.parse(localStorage.getItem('currentUser')).username;
    this.post.username = user;
    this.post.title = this.form.get('title').value;
    this.post.text = this.form.get('text').value;
    if(this.image){
      //console.log('posting shit with an image');
      this.post.attach = this.image;
    }
    //console.log('Post: ', this.post);

    this.service.newPost(this.post)
                .subscribe(
                  poop => //console.log(poop),
                  err => //console.log('error posting in new-post component')
                );
  }

  imageUploaded(event){
    let res = JSON.parse(event.serverResponse._body);
    //console.log('Image uploading response: ', res);
    this.image = res.path;
    //console.log('image url hopefully', this.image);
  }

}
