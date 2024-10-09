import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate, CanActivateChild{

constructor(private auth: AuthService, private router: Router) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.auth.isAuthenticated()
    .then((authenticated: boolean)=>{
      console.log(`Authenticated: ${authenticated}`);
      if(authenticated){
        return true;
      } else {
        alert('Bạn không có quyền truy cập trang quản trị');
        this.router.navigate(['/']);
        return false;
      }
    })
}
canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.canActivate(childRoute, state);
}


}
