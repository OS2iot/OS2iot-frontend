import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayloadDecoderComponent } from './payload-decoder/payload-decoder.component';
import { PayloadDecoderTableComponent } from './payload-decoder/payload-decoder-table/payload-decoder-table.component';
import { PayloadDecoderRowComponent } from './payload-decoder/payload-decoder-table/payload-decoder-row/payload-decoder-row.component';
import { PayloadDecoderEditComponent } from './payload-decoder/payload-decoder-edit/payload-decoder-edit.component';
import { PayloadDecoderDetailComponent } from './payload-decoder/payload-decoder-detail/payload-decoder-detail.component';



@NgModule({
  declarations: [PayloadDecoderComponent, PayloadDecoderTableComponent, PayloadDecoderRowComponent, PayloadDecoderEditComponent, PayloadDecoderDetailComponent],
  imports: [
    CommonModule
  ]
})
export class PayloadDecoderModule { }
