import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolverService implements Resolve<User> {

  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
    const id = +route.paramMap.get('id');
    return this.userService.getUser(id).pipe(
      take(1),
      mergeMap(user => {
        if (user) {
          return of(user);
        } else { // id not found
          this.router.navigate(['/home']);
          return EMPTY;
        }
      })
    );
  }

}
