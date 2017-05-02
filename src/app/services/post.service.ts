import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Post } from './objects/Post';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  private saveUrl: string = 'http://vapeboyz.xyz/api/posts/save';
  private upvoteUrl: string = 'http://vapeboyz.xyz/api/post/upvote';
  private postUrl: string = 'http://vapeboyz.xyz/api/post';

  constructor(private http:Http) {

  }

  save(curruser, postid){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.saveUrl, { username: curruser, post_id: postid }, options)
              .map(
                (res: Response) => {
                  if(res.ok) return true;
                }
              )
              .catch(
                (err: any) => {
                  console.log('error saving post in post service', err);
                  return Observable.throw(err);
                }
              );
  }

  upvote(curruser, postid){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.upvoteUrl, { username: curruser, post_id: postid }, options)
            .map(
              (res: Response) => {
                if(res.status === 302 || res.status === 201){
                  return true;
                }
              }
            )
            .catch(
              (err: any) => {
                console.log('error upvoting post in post service', err);
                return Observable.throw(err);
              }
            );
  }

  get(postid){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.postUrl}/${postid}`)
              .map(
                (res: Response) => {
                  if(res.status === 302) return JSON.parse(res.json());
                }
              )
              .catch(
                (err: any) => {
                  console.log('error getting post from post service', err);
                  return Observable.throw(err);
                }
              );
  }


}
