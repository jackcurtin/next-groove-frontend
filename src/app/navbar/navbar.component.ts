import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;


  constructor(private userService: UserService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.userService.searchSubject.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  getCurrentUser(): boolean {
    let token = localStorage.getItem('token');
    if (token){
      return true;
    } else {
      return false;
    }
  }
}
