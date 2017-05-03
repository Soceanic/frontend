import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from 'app/services/objects/user';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FriendsService {

  private baseUrl: string = 'http://soceanic.me/api';
  private curruser: string = JSON.parse(localStorage.getItem('currentUser')).username;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  private urls = {
    request: `${this.baseUrl}/friend`,
    respond: `${this.baseUrl}/respond`,
    block: `${this.baseUrl}/block`,
    status: `${this.baseUrl}/${this.curruser}`,
    requests: `${this.baseUrl}/requests/${this.curruser}`,
    friends: `${this.baseUrl}/friends`
  }

  constructor(private http: Http) { }

  request(newfriend: string){
    return this.http.post(this.urls.request,
      { username1: this.curruser, username2: newfriend }, this.options)
             .map(
               (res: Response) => {
                 if(res.status === 201) return true;
               }
             )
             .catch(
               (err: any) => {
                   //console.log('error sending friend request', err)
                   return Observable.throw(err);
               }
             );
  }

  respond(newfriend, status){
    return this.http.put(this.urls.respond,
      { username1: this.curruser, username2: newfriend, status: status }, this.options)
                    .map(
                      (res: Response) => {
                        if(res.status === 200) return true;
                      }
                    )
                    .catch(
                      (err: any) => {
                        //console.log('error responding to friend request', err);
                        return Observable.throw(err);
                      }
                    );
  }

  block(newfriend){
    return this.http.post(this.urls.block,
      { username1: this.curruser, username2: newfriend }, this.options)
             .map(
               (res: Response) => {
                 if(res.status === 201) return true;
               }
             )
             .catch(
               (err: any) => {
                   //console.log('error blocking user', err)
                   return Observable.throw(err);
               }
             );
  }

  status(newfriend){
    return this.http.get(`${this.urls.status}/${this.curruser}/${newfriend}`)
                    .map(
                      (res: Response) => {
                        let body = res.json();
                        return body;
                      }
                    )
                    .catch(
                      (err: any) => {
                        //console.log('error getting status of a relationship', err);
                        return Observable.throw(err);
                      }
                    );
  }

  requests(){
    return this.http.get(`${this.urls.requests}`)
                    .map(
                      (res: Response) => {
                        //console.log(res)
                        let body = res.json();
                        return body;
                      }
                    )
                    .catch(
                      (err: any) => {
                        //console.log('error getting friend requests', err);
                        return Observable.throw(err);
                      }
                    );
  }

  friends(username){
    return this.http.get(`${this.urls.friends}/${username}`)
                    .map(
                      (res: Response) => {
                        let body = res.json();
                        return body;
                      }
                    )
                    .catch(
                      (err: any) => {
                        //console.log('error getting friends', err);
                        return Observable.throw(err);
                      }
                    );
  }

}
