import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopBarModule } from 'src/app/shared/top-bar/top-bar.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from 'src/app/shared/form/form.module';
import { GatewayTableComponent } from './gateway-table/gateway-table.component';
import { GatewayTableRowComponent } from './gateway-table-row/gateway-table-row.component';
import { GatewaysComponent } from './gateways/gateways.component';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';
import { FormsModule } from '@angular/forms';
import { GatewayDetailComponent } from './gateway-detail/gateway-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    GatewayTableComponent,
    GatewayTableRowComponent,
    GatewaysComponent,
    GatewayListComponent,
    GatewayDetailComponent,
    GatewayEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TopBarModule,
    TranslateModule,
    FormModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    GatewayTableComponent,
    GatewayTableRowComponent,
    GatewaysComponent,
    GatewayListComponent,
    GatewayEditComponent,
  ]
})
export class GatewayModule { }
