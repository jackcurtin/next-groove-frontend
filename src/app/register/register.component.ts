import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {ProfileService} from '../services/profile/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email: string;
  public password: string;

  registerUser(): void{
    const newUser = {email: this.email, password: this.password};
    this.userService.registerUser(newUser);
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
