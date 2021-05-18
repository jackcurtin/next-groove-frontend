import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() currentUser: any;


  constructor() { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {}
}
