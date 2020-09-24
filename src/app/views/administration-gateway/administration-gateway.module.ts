import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineLoraGatewaysComponent } from './lora-gateways/lora-gateways.component';
import { RouterModule } from '@angular/router';
import { ListLoraGatewayComponent } from './list-lora-gateway/list-lora-gateway.component';
import { TopBarModule } from 'src/app/shared/top-bar/top-bar.module';
import { TranslateModule } from '@ngx-translate/core';
import { AdminLoraTableComponent } from './admin-lora-table/admin-lora-table.component';
import { AdminLoraTableRowComponent } from './admin-lora-table-row/admin-lora-table-row.component';
import { FormModule } from 'src/app/shared/form/form.module';
import { EditGatewayComponent } from './edit-gateway/edit-gateway.component';
import { GatewayComponent } from './gateway/gateway.component';
@NgModule({
  declarations: [
    MineLoraGatewaysComponent,
    ListLoraGatewayComponent,
    AdminLoraTableComponent,
    AdminLoraTableRowComponent,
    EditGatewayComponent, GatewayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TopBarModule,
    TranslateModule,
    FormModule
  ],
  exports: [
    MineLoraGatewaysComponent,
    ListLoraGatewayComponent,
    EditGatewayComponent
  ]
})
export class AdministrationGatewayModule { }
