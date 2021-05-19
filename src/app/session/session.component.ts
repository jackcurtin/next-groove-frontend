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
  }

}
