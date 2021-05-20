import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  getAlbum(albumId): any {
    return this.http.get(`${herokuUrl}/albums/browse/${albumId}`);
  }
  createAlbum(newAlbumObject): any {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.post(`${herokuUrl}/albums/add`, newAlbumObject, requestOptions)
      .subscribe(respose => respose), err => console.log(err);
  }
}
