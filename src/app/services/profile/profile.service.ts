import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

const herokuUrl = 'https://next-groove-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  currentUser: string;
  searchSubject = new Subject();

  constructor(private http: HttpClient, private router: Router) { console.log('profile service loaded'); }

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
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/browse']);
      }, err => console.log(err));


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

  // sub-methods to return the difference between the properties of tone/mood and join them into one number
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

  // goes through user's collection and runs the methods above to find the album with the
  // smallest difference value between Tone and Mood respecitvely
  findNextGroove(selection, collection): any{
    let next = collection[0];
    console.log(selection);
    console.log(selection.id + ' : ids : ' + next.id);
    if (selection.id === next.id){
      next = collection[1];
    }
    let closestToneMatchVal = this.compareTone(selection, collection[0]);
    let closestToneMatch = next;
    let closestMoodMatchVal = this.compareMood(selection, collection[0]);
    let closestMoodMatch = next;
    collection.forEach(album => {
      // skips self, negating any album recommending itself as the best match
      if (album.id === selection.id){
        console.log('skipping match');
      } else {
        let compareTone = this.compareTone(selection, album);
        let compareMood = this.compareMood(selection, album);
        if (compareTone < closestToneMatchVal) {
          closestToneMatchVal = compareTone;
          closestToneMatch = album;
        }
        if (compareMood < closestMoodMatchVal){
          closestMoodMatchVal = compareMood;
          closestMoodMatch = album;
        }
      }
    });
    // if the mood and tone matches are the same, return that album
    if (closestMoodMatch.id === closestToneMatch.id){
      next = closestMoodMatch;
    }
    // if they are different, calculate the inverse value (tone for mood, mood for tone) to see which album's inverse value
      // has the smallest difference with the selected album
    else{
      const compareClosestMoodTone = this.compareTone(selection, closestMoodMatch);
      const compareClosestToneMood = this.compareMood(selection, closestToneMatch);
      // if it's a tie with these values, the initial mood match is recommended
      if (compareClosestToneMood < compareClosestMoodTone){
        next = closestToneMatch;
      } else{
        next = closestMoodMatch;
      }
    }
    return next;
  }
}
