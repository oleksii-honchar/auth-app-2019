import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
