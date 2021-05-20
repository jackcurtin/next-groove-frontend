import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {BrowseComponent} from './browse/browse.component';
import {CollectionComponent} from './collection/collection.component';
import {SessionComponent} from './session/session.component';
import {RateComponent} from './rate/rate.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: 'profile/collection',
    component: CollectionComponent
  },
  {
    path: 'profile/session',
    component: SessionComponent
  },
  {
    path: 'profile/rate/:id',
    component: RateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
