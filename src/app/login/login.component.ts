import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  loginUser(): void{
    const user = {email: this.email, password: this.password};
    console.log(user);
    this.userService.loginUser(user);
    this.router.navigate(['/profile/collection']);
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

}
