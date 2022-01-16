import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

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
      (res: any) => {
        console.log(res);

        this.loginService.loginUser(res.token);
        this.loginService.getCurrentUser().subscribe(
          (res) => {
            console.log(res);
            this.loginService.setUser(res);
            if (this.loginService.getUserRole() == 'ADMIN') {
              // redirect to admin dashboard
              this.router.navigateByUrl('/admin');
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              // redirect to user dashboard
              this.router.navigateByUrl('/user-dashboard');
            } else {
              this.loginService.logout();
              location.reload();
            }
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
        this.snack.open('Invalid Details !!', '', {
          duration: 3000,
        });
      }
    );
  }
}
