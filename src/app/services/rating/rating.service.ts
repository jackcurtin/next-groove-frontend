import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
