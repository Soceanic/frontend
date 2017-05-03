import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './objects/user';

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  private profileUrl: string = 'http://soceanic.me/api/users';
  private friendUrl: string = 'http://soceanic.me/api/friends';

  getProfile(username): Observable<User>{
    return this.http.get(`${this.profileUrl}/${username}`)
                    .map(
                      (res: Response) => {
                        let body = res.json();
                        console.log(body);
                        return body;
                      }
                    )
                    .catch(
                      (err: any) => {
                        console.log('error getting profile in profile service', err);
                        return Observable.throw(err);
                      }
                    )
  }

  getFriends(username): Observable<[User]>{
    return this.http.get(`${this.friendUrl}/${username}`)
                    .map(
                      (res: Response) => {
                        let body = res.json();
                        return body;
                      }
                    )
                    .catch(
                      (err: any) => {
                        console.log('error getting friends in profile service', err);
                        return Observable.throw(err);
                      }
                    )
  }

}
