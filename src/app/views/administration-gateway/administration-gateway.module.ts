import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineLoraGatewaysComponent } from './mine-lora-gateways/mine-lora-gateways.component';
import { RouterModule } from '@angular/router';
import { ListLoraGatewayComponent } from './list-lora-gateway/list-lora-gateway.component';


@NgModule({
  declarations: [
    MineLoraGatewaysComponent, 
    ListLoraGatewayComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MineLoraGatewaysComponent,
    ListLoraGatewayComponent
  ]
})
export class AdministrationGatewayModule { }
