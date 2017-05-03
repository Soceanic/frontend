import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Settings } from './objects/settings';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class SettingsService {

  private setUrl: string = 'http://soceanic.me/api/user';

  constructor(private http: Http) { }

  settings(user: Settings) {
    console.log('Modifying the user');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(user);
    console.log(JSON.stringify(user));

    return this.http.put(this.setUrl, user, options)
                    .map(this.extractData)
                    .catch(
                      (err) => {
                        return Observable.throw(err);
                      }
                    );
  }

  private extractData(res: Response) {
    if(!res.text()){
      console.log(res.statusText);
    }
  }

}
