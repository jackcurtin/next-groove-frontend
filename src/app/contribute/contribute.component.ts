import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../services/album/album.service";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  title: string;
  artist: string;
  genre: any;
  hL: number;
  mD: number;
  fS: number;
  uD: number;

  genres: [];

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getGenres();
    this.genre = -1;
  }

  getGenres(): any {
    this.albumService.getGenres().subscribe(response => {
      this.genres = response;
    }, err => console.log(err));
  }

}
