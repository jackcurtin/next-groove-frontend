import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public name: string;

  constructor(private profileService: ProfileService) { }

  createProfile(): void{
    this.profileService.createProfile(this.name);
  }

  ngOnInit(): void {
  }

}
