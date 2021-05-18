import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {ProfileService} from "../services/profile/profile.service";

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
    this.profileService.createProfile(newProfile);
  }

  constructor(private userService: UserService, private profileService: ProfileService) { }

  ngOnInit(): void {
  }

}
