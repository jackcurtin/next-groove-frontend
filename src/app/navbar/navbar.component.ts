import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
  }

  // checks localStorage for JWT to see if someone is logged in
  getCurrentUser(): boolean {
    const token = localStorage.getItem('token');
    if (token){
      return true;
    } else {
      return false;
    }
  }
}
