import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GatewayTableComponent } from './gateway-table/gateway-table.component';
import { GatewaysComponent } from './gateways/gateways.component';
import { GatewayOverviewComponent } from './gateway-overview/gateway-overview.component';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';
import { FormsModule } from '@angular/forms';
import { GatewayDetailComponent } from './gateway-detail/gateway-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormModule } from '@shared/components/forms/form.module';
import { SharedModule } from '@shared/shared.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { GatewayStatusComponent } from './gateway-status/gateway-status.component';
import { GraphModule } from '@app/graph/graph.module';
import { GatewayListComponent } from './gateway-overview/gateway-tabs/gateway-list/gateway-list.component';
import { GatewayMapComponent } from './gateway-overview/gateway-tabs/gateway-map/gateway-map.component';
import { GatewayStatusOverviewComponent } from './gateway-overview/gateway-tabs/gateway-status-overview/gateway-status-overview.component';

const gatewayRoutes: Routes = [
  {
    path: '',
    component: GatewaysComponent,
    children: [
      {
        path: '',
        component: GatewayOverviewComponent,
        children: [
          { path: 'list', component: GatewayListComponent },
          { path: 'map', component: GatewayMapComponent },
          { path: 'status', component: GatewayStatusOverviewComponent },
        ],
      },
      { path: 'gateway-edit/:id', component: GatewayEditComponent },
      { path: 'gateway-edit', component: GatewayEditComponent },
      { path: 'gateway-detail/:id', component: GatewayDetailComponent },
    ],
  },
];

@NgModule({
  declarations: [
    GatewayTableComponent,
    GatewaysComponent,
    GatewayOverviewComponent,
    GatewayDetailComponent,
    GatewayEditComponent,
    GatewayStatusComponent,
    GatewayListComponent,
    GatewayMapComponent,
    GatewayStatusOverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormModule,
    FormsModule,
    FontAwesomeModule,
    NGMaterialModule,
    RouterModule.forChild(gatewayRoutes),
    SharedModule,
    PipesModule,
    GraphModule,
  ],
  exports: [
    GatewayTableComponent,
    GatewaysComponent,
    GatewayOverviewComponent,
    GatewayEditComponent,
    GatewayStatusComponent,
    RouterModule,
  ],
})
export class GatewayModule {}
