import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile/profile.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  myProfile: any
  myCollection = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.myProfile = this.profileService.getProfile();
    this.myCollection = this.myProfile.collection;
    console.log(this.myCollection);
  }

}
