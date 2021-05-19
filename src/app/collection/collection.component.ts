import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../services/profile/profile.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  myProfile: any;
  myCollection = [];

  constructor(private profileService: ProfileService) { }

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
    this.profileService.removeFromCollection(album);
    this.getCollection();
  }

}
