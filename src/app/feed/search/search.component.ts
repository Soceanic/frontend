import { Component, OnInit } from '@angular/core';
import { MdInputContainer, MdAutocomplete } from '@angular/material';
import { FeedService } from 'app/services/feed.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [FeedService]
})
export class SearchComponent implements OnInit {

  items: Observable<string[]>;

  constructor(private service: FeedService, private router: Router) { }

  private searchTermStream = new Subject<string>();

  search(term: string) { this.searchTermStream.next(term); }

  ngOnInit() {
    //console.log('search loaded');
    this.items = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.service.search(term));
  }

  redirect(username: string){
    this.router.navigateByUrl(`/profile/${username}`);
  }

}
