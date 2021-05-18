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
  public name: string;

  registerUser(): void{
    const newUser = {email: this.email, password: this.password};
    const newProfile = {name: this.name};
    this.userService.registerUser(newUser, newProfile);
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
