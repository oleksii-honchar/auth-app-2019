import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  SignInComponent,
  SignUpComponent,
  DashboardComponent
} from 'src/app/modules';
import { VersionResolver } from '@app/core/resolvers/version.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
    resolve: {
      version: VersionResolver
    }
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    resolve: {
      version: VersionResolver
    }
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    resolve: {
      version: VersionResolver
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      version: VersionResolver
    }
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    VersionResolver
  ]
})
export class AppRoutingModule { }
