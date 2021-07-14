import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, Loadingstate } from 'src/app/store/reducers/initial-state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loading$ : Observable<Loadingstate>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(store => store.loadingState);
  }

}
