import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('user required');
      // this._snackBar.open('username is required!!', '', {
      //   duration: 3000,
      // });
      Swal.fire('failed', 'username is required', 'error');
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (res) => {
        console.log(res);
        // alert('user registered');
        this._snackBar.open('user registered', '', {
          duration: 3000,
        });
      },
      (err) => {
        console.log(err);
        // alert('something went wrong');
        this._snackBar.open('something went wrong', '', {
          duration: 3000,
        });
      }
    );
  }
}
