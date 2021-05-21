import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {RatingService} from '../services/rating/rating.service';

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private ratingService: RatingService) { }

  // gets album from id passed in URL
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.album = this.getAlbum(params.get('id'));
    });
  }

  getAlbum(albumId): any{
    this.http
      .get(`${herokuUrl}/albums/browse/${albumId}`)
      .subscribe(response => {
        return this.album = response;
      });
  }
  // takes values attached to sliders and puts them into a JSON object that is sent to the API to create the rating
  submitRatings(hL, mD, fS, uD): any{
    console.log(`submitting ratings ${hL}, ${mD}, ${fS}, ${uD} `);
    const newRatingObject = {
      mdValue: mD,
      hiLoValue: hL,
      fsValue: fS,
      udValue: uD
    };
    return this.ratingService.rateAlbum(this.album.id, newRatingObject);
  }
}
