import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      role: new FormControl(0),
    });
  }

  ngOnInit() {}

  onRegister() {
    if (this.registerForm.invalid) {
      alert('Đăng ký thất bại');
      return console.log("Không hợp lệ");
    }

    this.authService.register(this.registerForm.value).subscribe(
      (res: any) => {
        alert('Đăng ký thành công');
        this.router.navigate(['/account/login'])
      }
    );
  }

  nameValidator() {}

  phoneNumberValidator() {}

  repassValidator() {}
}
