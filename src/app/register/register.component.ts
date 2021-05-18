import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public emailAddress: string;
  public password: string;
  public name: string;

  registerUser(): void{
    const newUser = {emailAddress: this.emailAddress, password: this.password};
    const newProfile = {name: this.name};
    this.userService.registerUser(newUser);
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
