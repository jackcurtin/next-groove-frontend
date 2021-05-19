import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
    const token = localStorage.getItem('token');
    console.log(token);
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
    };
    this.http
      .post(`${herokuUrl}/auth/create-profile`, newProfile, requestOptions)
      .subscribe(response => console.log(response), err => console.log(err));
  }

  getProfile(): any{
    const token = localStorage.getItem('token');
    console.log(token);
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.get(`${herokuUrl}/profile`, requestOptions);
  }

  getCollection(): any {
    const profile = this.getProfile();
    return this.getProfile().collection;
  }

  addToCollection(album): any {
    const token = localStorage.getItem('token');
    console.log(token);
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    this.http
      .post(`${herokuUrl}/albums/addToCollection/${album.id}`, null, requestOptions)
      .subscribe(response => console.log(response), err => console.log(err));
  }
}
