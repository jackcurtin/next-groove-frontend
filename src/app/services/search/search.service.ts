import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  findAlbums(searchCriteria, albums): any{
    const filteredAlbums = [];
    albums.forEach(album => {
      if (album.title.includes(searchCriteria.toUpperCase()) ||
      album.artist.includes(searchCriteria.toUpperCase())){
        filteredAlbums.push(album);
        console.log(filteredAlbums);
      }
    });
    return filteredAlbums;
  }
}
