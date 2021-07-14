import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AppState } from '../store/reducers/initial-state';
import { getUser } from '../store/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private router:Router,
    private store: Store<AppState>
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    /*return this.getUser().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );*/
    return this.store.pipe(select(getUser)).pipe(
      take(1),
      map(data => data!=''),
      tap(auth => {
          if (!auth) {
            this.router.navigate(['/']);
          }
      })
      
    );
    //return of(true);
  }

  private getUser() {
    return this.store.pipe(select(getUser)).pipe(
      //tap(data => this.prefetch(data)),
      filter(data => data!=''),
      take(1)
    );
  }
}
