import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AlbumService} from '../services/album/album.service';
import {MatButtonModule} from '@angular/material/button';

const herokuUrl = 'https://next-groove-api.herokuapp.com';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  album: any;
  hLVal: number;
  mDVal: number;
  fSVal: number;
  uDVal: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.album = this.getAlbum(params.get('id'));
    });
    console.log(this.album);
  }

  getAlbum(albumId): any{
    this.http
      .get(`${herokuUrl}/albums/browse/${albumId}`)
      .subscribe(response => {
        console.log(response);
        return this.album = response;
      });
  }
  submitRatings(hL, mD, fS, uD): any{
    console.log(`submitting ratings ${hL}, ${mD}, ${fS}, ${uD} `);
  }
}
