import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../services/album/album.service';
import {RatingService} from '../services/rating/rating.service';
import {ProfileService} from "../services/profile/profile.service";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  title: string;
  artist: string;
  genre: any;
  coverURL: string;
  hL: number;
  mD: number;
  fS: number;
  uD: number;

  genres: [];

  constructor(private albumService: AlbumService, private ratingService: RatingService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getGenres();
    this.genre = '';
  }

  getGenres(): any {
    this.albumService.getGenres().subscribe(response => {
      this.genres = response;
    }, err => console.log(err));
  }

  createAlbum(): any{
    console.log(
      this.title + ' ' + this.artist + ' ' + this.genre + ' '
      + this.hL + ' ' + this.mD + ' ' + this.fS + ' ' + this.uD
    );
    const newAlbumObject = {
      title: this.title,
      artist: this.artist,
      genre: this.genre,
      coverArtURL: this.coverURL
    };
    const newRatingObject = {
      mdValue: this.mD,
      hiLoValue: this.hL,
      fsValue: this.fS,
      udValue: this.uD
    };
    const newAlbum = this.albumService.createAlbum(newAlbumObject);
    this.profileService.addToCollection(newAlbum);
    this.ratingService.rateAlbum(newAlbum.id, newRatingObject);
  }

}
