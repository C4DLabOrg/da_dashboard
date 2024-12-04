import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //signing up
        if (localStorage.getItem('user')) {
            // logged in so return true
            return true;
        }else{

        // not logged in so redirect to login page with the return url
        this.router.navigate(['signin'], { queryParams: { returnUrl: state.url }});
        return false;
        }

    }


}
