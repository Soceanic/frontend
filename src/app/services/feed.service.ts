import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Post } from './objects/post';

@Injectable()
export class FeedService {

  constructor(private http: Http) { }

  private postUrl: string = 'http://vapeboyz.xyz/api/posts';
  private feedUrl: string = 'http://vapeboyz.xyz/api/feed';
  private boxUrl: string = 'http://vapeboyz.xyz/api/box';

  getFeed(username): Observable<[Post]>{
    return this.http.get(`${this.postUrl}/${username}`)
                    .map(
                      (res: Response) => {
                        let body = res.json();
                        return JSON.parse(body);
                      }
                    )
                    .catch(
                      (err: any) => {
                        console.log('error getting feed in feed service', err);
                        return Observable.throw(JSON.parse(err._body));
                      }
                    );
  }

  getPosts(username: string){
    return this.http.get(`${this.postUrl}/${username}`)
                    .map(
                      (res: Response) => {
                        let body = res.json();
                        return JSON.parse(body);
                      }
                    )
                    .catch(
                      (err: any) => {
                        console.log('error getting posts in feed service', err);
                        return Observable.throw(err);
                      }
                    );
  }

  getBox(currname: string, friendname?: string){
    let url;
    if(friendname){
      url = `${this.boxUrl}/${currname}/${friendname}`;
    }else{
      url = `${this.boxUrl}/${currname}`;
    }

    return this.http.get(url)
                    .map(
                      (res: Response) => {
                        let body = res.json();
                        return body;
                      }
                    )
                    .catch(
                      (err: any) => {
                        console.log('error getting box in feed service', err);
                        return Observable.throw(err);
                      }
                    );
  }

}
