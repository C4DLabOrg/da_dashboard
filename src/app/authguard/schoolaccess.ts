import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class Schoolaccess implements CanActivate {

    constructor(private router: Router) { }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
          if(localStorage.getItem('user') && localStorage.getItem('user-type') == 'teacher'){
            return true;
          }
          else{
            //console.log('Cannot access page');
            this.router.navigate(['404']);
            return false;
          }
        }

}
