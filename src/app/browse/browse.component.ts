import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../services/album/album.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  albums = [];

  constructor(private albumService: AlbumService) { }

  getAlbums(): any {
    this.albumService.getAlbums().subscribe(response => {
      this.albums = response;
    }, err => console.log(err));
  }

  ngOnInit(): void {
    this.getAlbums();
  }

}
