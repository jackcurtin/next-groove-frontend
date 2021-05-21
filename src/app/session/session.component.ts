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

  // automatically loads page with album recommendation based on the selected album, passed from the colleciton component
  ngOnInit(): void {
    this.nextGroove = this.findNextGroove(this.selection, this.collection);
  }

  findNextGroove(selection, collection): any{
    return this.profileService.findNextGroove(selection, collection);
  }
}
