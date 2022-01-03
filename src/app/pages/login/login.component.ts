import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';
MatSnackBar;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginData = {
    username: '',
    password: '',
  };
  constructor(private snack: MatSnackBar, private loginService: LoginService) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.loginData);
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('username is required !!', '', { duration: 3000 });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('password is required !!', '', { duration: 3000 });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
