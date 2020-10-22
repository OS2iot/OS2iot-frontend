import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PayloadDecoderRoutingModule } from './payload-decoder-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { PayloadDecoderDetailComponent } from './payload-decoder-detail/payload-decoder-detail.component';
import { PayloadDecoderEditComponent } from './payload-decoder-edit/payload-decoder-edit.component';
import { PayloadDecoderListComponent } from './payload-decoder-list/payload-decoder-list.component';
import { PayloadDecoderRowComponent } from './payload-decoder-list/payload-decoder-row/payload-decoder-row.component';
import { PayloadDecoderTableComponent } from './payload-decoder-list/payload-decoder-table/payload-decoder-table.component';
import { PayloadDecoderComponent } from './payload-decoder.component';

@NgModule({
  declarations: [
    PayloadDecoderComponent,
    PayloadDecoderTableComponent,
    PayloadDecoderRowComponent,
    PayloadDecoderEditComponent,
    PayloadDecoderDetailComponent,
    PayloadDecoderListComponent
  ],
  exports: [
    PayloadDecoderComponent,
    PayloadDecoderTableComponent,
    PayloadDecoderRowComponent,
    PayloadDecoderEditComponent,
    PayloadDecoderDetailComponent,
    PayloadDecoderListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    TopBarModule,
    PayloadDecoderRoutingModule,
    ReactiveFormsModule,
    FormModule,
  ]
})
export class PayloadDecoderModule { }
