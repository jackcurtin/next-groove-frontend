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
    this.router.navigate(['/welcome']);
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
  }
}
