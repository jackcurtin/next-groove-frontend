import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../services/profile/profile.service';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public name: string;
  public currentUser: any;
  public currentProfile;

  constructor(private profileService: ProfileService, private userService: UserService) { }

  createProfile(): void{
    const newProfile = {name: this.name};
    this.profileService.createProfile(newProfile);
  }

  ngOnInit(): void {
    this.userService.searchSubject.subscribe(currentUser => {
      this.currentUser = currentUser;
      console.log(currentUser);
    });
    this.currentProfile = this.profileService.getProfile();
  }

}
