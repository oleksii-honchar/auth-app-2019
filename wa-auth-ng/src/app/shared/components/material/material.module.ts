import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule
} from '@angular/material';

import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }
