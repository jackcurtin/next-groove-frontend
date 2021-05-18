import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

const herokuUrl = 'https://next-groove-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  currentUser: string;
  searchSubject = new Subject();

  constructor(private http: HttpClient) { console.log('profile service loaded'); }

  createProfile(newProfile): void {
    console.log(newProfile);
    this.http
      .post(`${herokuUrl}/auth/create-profile`, newProfile)
      .subscribe(response => console.log(response), err => console.log(err));
  }
}
