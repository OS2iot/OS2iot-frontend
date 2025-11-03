import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { GraphModule } from "@app/graph/graph.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslatePipe } from "@ngx-translate/core";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { FormModule } from "@shared/components/forms/form.module";
import { TableSortIconComponent } from "@shared/components/table-sort-icon/table-sort-icon.component";
import { PipesModule } from "@shared/pipes/pipes.module";
import { SharedModule } from "@shared/shared.module";
import { GatewayChangeOrganizationDialogComponent } from "./gateway-change-organization-dialog/gateway-change-organization-dialog.component";
import { GatewayDetailComponent } from "./gateway-detail/gateway-detail.component";
import { GatewayEditComponent } from "./gateway-edit/gateway-edit.component";
import { GatewayOverviewComponent } from "./gateway-overview/gateway-overview.component";
import { GatewayListComponent } from "./gateway-overview/gateway-tabs/gateway-list/gateway-list.component";
import { GatewayMapComponent } from "./gateway-overview/gateway-tabs/gateway-map/gateway-map.component";
import { GatewayStatusOverviewComponent } from "./gateway-overview/gateway-tabs/gateway-status-overview/gateway-status-overview.component";
import { GatewayStatusComponent } from "./gateway-status/gateway-status.component";
import { GatewayTableComponent } from "./gateway-table/gateway-table.component";
import { GatewaysComponent } from "./gateways/gateways.component";

const gatewayRoutes: Routes = [
  {
    path: "",
    component: GatewaysComponent,
    children: [
      {
        path: "",
        component: GatewayOverviewComponent,
        children: [
          { path: "list", component: GatewayListComponent },
          { path: "map", component: GatewayMapComponent },
          { path: "status", component: GatewayStatusOverviewComponent },
        ],
      },
      { path: "gateway-edit/:id", component: GatewayEditComponent },
      { path: "gateway-edit", component: GatewayEditComponent },
      { path: "gateway-detail/:id", component: GatewayDetailComponent },
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
    GatewayChangeOrganizationDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
    FormModule,
    FormsModule,
    FontAwesomeModule,
    NGMaterialModule,
    RouterModule.forChild(gatewayRoutes),
    SharedModule,
    PipesModule,
    GraphModule,
    TableSortIconComponent,
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
