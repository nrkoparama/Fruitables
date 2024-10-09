import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin!: any;
  isADM!: any;
  constructor(private auth: AuthService) {
    this.isLogin = this.auth.checkLogin();
    this.isADM = this.auth.checkAdmin();
  }

  ngOnInit() {
  }

  onLogOut(){
    localStorage.clear();
    location.reload();
  }
}
