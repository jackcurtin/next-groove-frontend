import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';

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
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
