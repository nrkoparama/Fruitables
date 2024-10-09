import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: User;

  constructor(private authService: AuthService) {
    this.user = new User();
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.invalid) {
      alert('Vui lòng nhập lại tài khoản hoặc mật khẩu');
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        let jsonData = JSON.stringify(res);
        localStorage.setItem('login', jsonData);
        location.assign('/');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
