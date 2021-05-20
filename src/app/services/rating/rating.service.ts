import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

const herokuUrl = 'https://next-groove-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient, private router: Router) { }

  goToRating(albumId): void{
    this.router.navigate([`/profile/rate/${albumId}`]);
  }

  rateAlbum(albumId, newRatingObject): any{
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.put(`${herokuUrl}/profile/collection/${albumId}/rate`, newRatingObject, requestOptions)
      .subscribe(response => response), err => console.log(err);
  }
}
