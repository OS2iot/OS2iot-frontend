import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { SharedModule } from '@shared/shared.module';
import { WelcomeDialogComponent } from './welcome-dialog.component';

@NgModule({
  declarations: [WelcomeDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NGMaterialModule,
    FormsModule,
  ],
})
export class WelcomeDialogModule {}
