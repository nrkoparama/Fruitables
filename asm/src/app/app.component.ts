import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // dùng để  ko hiện header footer trang admin


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// dùng để  ko hiện header footer trang admin
export class AppComponent{
  isAdminPage = false
  isAccountPage = false

  constructor(private router: Router){
    this.router.events.subscribe((event) =>{
      if(event instanceof NavigationEnd){
        this.isAdminPage = event.urlAfterRedirects.includes('admin');
        this.isAccountPage = event.urlAfterRedirects.includes('account');
      }
  });
  }
}
