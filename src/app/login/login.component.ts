import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private userService: UserService) { }

  login(): void {
    this.userService.login(this.username, this.password)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
  }
}