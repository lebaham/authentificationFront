import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private tokenService: TokenStorageService, private myRoute: Router) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.tokenService.getToken()) {
            return true;
        } else {
            this.myRoute.navigate(['auth/login'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        }
    }
}
