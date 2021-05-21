import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {BrowseComponent} from './browse/browse.component';
import {CollectionComponent} from './collection/collection.component';
import {SessionComponent} from './session/session.component';
import {RateComponent} from './rate/rate.component';
import {ContributeComponent} from './contribute/contribute.component';
import {LogoutComponent} from './logout/logout.component';
import {LandingComponent} from "./landing/landing.component";

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
    path: 'logout',
    component: LogoutComponent
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
  },
  {
    path: 'contribute',
    component: ContributeComponent
  },
  {
    path: 'welcome',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
