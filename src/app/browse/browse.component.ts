import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../services/album/album.service';
import {SearchService} from '../services/search/search.service';
import {Subject} from 'rxjs';
import {ProfileService} from '../services/profile/profile.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  albums = [];
  genres = [];

  searchInput: string;
  filteredAlbums: any;
  genreFilter: any;
  searchSubject = new Subject();

  constructor(private albumService: AlbumService,
              private searchService: SearchService,
              private profileService: ProfileService) { }

  getAlbums(): any {
    this.albumService.getAlbums().subscribe(response => {
      this.albums = response;
    }, err => console.log(err));
  }
  getGenres(): any {
    this.albumService.getGenres().subscribe(response => {
      this.genres = response;
    }, err => console.log(err));
  }

  ngOnInit(): void {
    this.getAlbums();
    this.getGenres();
    console.log(this.genres);
    this.searchSubject.subscribe(searchCriteria => {
      console.log(searchCriteria);
      if (this.genreFilter){
        this.filterGenres();
      }
      this.filteredAlbums = this.searchService.findAlbums(searchCriteria, this.albums);
    });
  }

  pushSearch(searchInput): void{
    this.searchSubject.next(searchInput);
    console.log(this.filteredAlbums);
  }
  filterGenres(): void{
    console.log(this.genreFilter);
    if (this.genreFilter == -1){
      this.genreFilter = null;
      this.filteredAlbums = [];
      this.getAlbums();
    }else{
      this.albums = this.albums.filter(album => album.genre.name === this.genres[this.genreFilter].name);
    }
  }

  addToCollection(album): void{
    this.profileService.addToCollection(album);
  }

}
