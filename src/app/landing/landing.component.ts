import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../services/profile/profile.service';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  currentUser: any;
  currentProfile: any;

  constructor(private profileService: ProfileService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.searchSubject.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    this.getProfile();
  }

  getProfile(): void{
    this.profileService.getProfile()
      .subscribe(response => {
          this.currentProfile = response; },
        err => console.log(err));
  }

  getCurrentUser(): boolean {
    let token = localStorage.getItem('token');
    if (token){
      return true;
    } else {
      return false;
    }
  }

}
