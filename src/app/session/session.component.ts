import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../services/profile/profile.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  @Input() selection: any;
  @Input() collection: [];
  nextGroove: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.nextGroove = this.findNextGroove(this.selection, this.collection);
    console.log(this.nextGroove);
  }

  findNextGroove(selection, collection): any{
    return this.profileService.findNextGroove(selection, collection);
  }

  // findNextGroove(): any{
  //   let next = this.collection[0];
  //   let closestToneMatch = this.profileService.compareTone(this.selection, this.collection[0]);
  //   let closestMoodMatch = this.profileService.compareMood(this.selection, this.collection[0]);
  //   this.collection.forEach(album => {
  //     let compareTone = this.profileService.compareTone(this.selection, album);
  //     let compareMood = this.profileService.compareMood(this.selection, album)
  //     if (compareTone < closestToneMatch && compareTone < closestMoodMatch){
  //       closestToneMatch = compareTone;
  //       closestMoodMatch = compareMood;
  //       next = album;
  //     }
  //   });
  //   return next;
  // }

}
