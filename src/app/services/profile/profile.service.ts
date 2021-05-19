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
    const token = localStorage.getItem('token');
    console.log(token);
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.get(`${herokuUrl}/profile/collection`, requestOptions);
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

  removeFromCollection(album): any {
    const token = localStorage.getItem('token');
    console.log(token);
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http
      .delete(`${herokuUrl}/profile/collection/${album.id}`, requestOptions);
  }

  compareTone(album1, album2): number{
    const diffHL = album1.avgHLVal - album2.avgHLVal;
    const diffMD = album1.avgMDVal - album2.avgHLVal;
    return (diffHL * diffHL + diffMD * diffMD);
  }
  compareMood(album1, album2): number{
    const diffFS = album1.avgFSVal - album2.avgFSVal;
    const diffUD = album1.avgUDVal - album2.avgUDVal;
    return (diffFS * diffFS + diffUD * diffUD);
  }

  findNextGroove(selection, collection): any{
    let next = collection[0];
    let closestToneMatch = this.compareTone(selection, collection[0]);
    let closestMoodMatch = this.compareMood(selection, collection[0]);
    collection.forEach(album => {
      let compareTone = this.compareTone(selection, album);
      let compareMood = this.compareMood(selection, album);
      if (compareTone < closestToneMatch && compareTone < closestMoodMatch){
        closestToneMatch = compareTone;
        closestMoodMatch = compareMood;
        next = album;
      }
    });
    return next;
  }
}
