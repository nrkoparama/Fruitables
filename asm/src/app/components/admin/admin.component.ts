import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
Router;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private auth: AuthGuardService) {}
  ngOnInit() {
    this.helloAdmin();
  }

  helloAdmin() {
    let jsonData = localStorage.getItem('login');

    if (jsonData) {
      try {
        let adminAuth = JSON.parse(jsonData);
        setTimeout(() => {
          alert(`Xin chào admin ${adminAuth.name}`);
          this.router.navigate(['/admin/product-list'])
        }, 100);
      } catch (error) {
        console.log('JSON data sai :))))');
      }
    }
  }
}
