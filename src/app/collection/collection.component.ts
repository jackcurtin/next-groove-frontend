import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../services/profile/profile.service';
import {AlbumService} from '../services/album/album.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  myProfile: any;
  myCollection = [];
  mySelection: any;

  constructor(private profileService: ProfileService, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getCollection();
  }

  getProfile(): void{
    this.profileService.getProfile()
      .subscribe(response => {
      this.myProfile = response; },
      err => console.log(err));
  }
  getCollection(): void{
    this.profileService.getCollection()
      .subscribe(response => {
        this.myCollection = response;
      }, err => console.log(err));
  }
  removeFromCollection(album): void{
    this.profileService.removeFromCollection(album)
      .subscribe(response => response, err => console.log(err));
    this.getCollection();
  }
  selectAlbum(album): any{
    this.mySelection = this.albumService.getAlbum(album)
      .subscribe(response => {
        this.mySelection = response;
      }, err => console.log(err));
  }

}
