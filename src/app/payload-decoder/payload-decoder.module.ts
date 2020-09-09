import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayloadDecoderComponent } from './payload-decoder/payload-decoder.component';
import { PayloadDecoderTableComponent } from './payload-decoder/payload-decoder-table/payload-decoder-table.component';
import { PayloadDecoderRowComponent } from './payload-decoder/payload-decoder-table/payload-decoder-row/payload-decoder-row.component';
import { PayloadDecoderEditComponent } from './payload-decoder/payload-decoder-edit/payload-decoder-edit.component';
import { PayloadDecoderDetailComponent } from './payload-decoder/payload-decoder-detail/payload-decoder-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TopBarModule } from '../shared/top-bar/top-bar.module';
import { PayloadDecoderRoutingModule } from './payload-decoder-routing.module';
import { PayloadDecoderListComponent } from './payload-decoder/payload-decoder-list/payload-decoder-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PayloadDecoderComponent,
    PayloadDecoderTableComponent,
    PayloadDecoderRowComponent,
    PayloadDecoderEditComponent,
    PayloadDecoderDetailComponent,
    PayloadDecoderListComponent],
  exports: [
      PayloadDecoderComponent,
      PayloadDecoderTableComponent,
      PayloadDecoderRowComponent,
      PayloadDecoderEditComponent,
      PayloadDecoderDetailComponent,
      PayloadDecoderListComponent],
  imports: [
      CommonModule,
      TranslateModule,
      RouterModule,
      FormsModule,
      TopBarModule,
      PayloadDecoderRoutingModule,
      ReactiveFormsModule
  ]
})
export class PayloadDecoderModule { }
