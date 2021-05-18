import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const herokuUrl = 'https://next-groove-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }
  getAlbums(): any {
    return this.http.get(`${herokuUrl}/albums/browse/`);
  }
  getGenres(): any {
    return this.http.get(`${herokuUrl}/genres/`);
  }
}
