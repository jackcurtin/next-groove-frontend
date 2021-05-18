import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from "@angular/router";
import {ProfileService} from "../profile/profile.service";

const herokuUrl = 'https://next-groove-api.herokuapp.com'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: string;
  searchSubject = new Subject();

  constructor(private http: HttpClient, private router: Router,
              private profileService: ProfileService) { console.log('user service loaded'); }

  registerUser(newUser, newProfile): void {
    console.log(newUser);
    this.http
      .post(`${herokuUrl}/auth/register`, newUser)
      .subscribe(response => {
        console.log(response);
        this.loginUser(newUser, newProfile);
        this.router.navigate(['/login']);
      }, err => console.log(err));
  }

  loginUser(user, newProfile?): void {
    console.log(newProfile);
    this.http
      .post(`${herokuUrl}/auth/login`, user)
      .subscribe(response => {
        const token = response['jwt'];
        localStorage.setItem('currentUser', `${user.email}`);
        localStorage.setItem('token', `${token}`);
        this.currentUser = user;
        console.log(token);
        this.searchSubject.next(this.currentUser);
        this.profileService.createProfile(newProfile);
        this.router.navigate(['/profile']);
        }, err => console.log(err));
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUser = 'null';
    this.searchSubject.next(this.currentUser);
    // this.router.navigate(['/login']);
  }
}
