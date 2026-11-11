import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DatatargetListComponent } from "@app/datatarget/datatarget-list/datatarget-list.component";
import { DatatargetComponent } from "@app/datatarget/datatarget.component";
import { MqttDetailComponent } from "@app/datatarget/mqtt/mqtt-detail/mqtt-detail.component";
import { DatatargetNewComponent } from "@app/datatarget/datatarget-new/datatarget-new.component";
import { DatatargetEditComponent } from "@app/datatarget/datatarget-edit/datatarget-edit.component";
import { DatatargetDetailComponent } from "@app/datatarget/datatarget-detail/datatarget-detail.component";
import { DatatargetLogComponent } from "@app/datatarget/datatarget-log/datatarget-log.component";
import { DatatargetTestConnectionComponent } from "@app/datatarget/datatarget-test-connection/datatarget-test-connection.component";
import { HttppushDetailComponent } from "@app/datatarget/httppush/httppush-detail/httppush-detail.component";
import { FiwareDetailComponent } from "@app/datatarget/fiware/fiware-detail/fiware-detail.component";

const routes: Routes = [
  {
    path: "",
    component: DatatargetComponent,
    children: [
      { path: "", component: DatatargetListComponent },
      { path: "datatarget-new", component: DatatargetNewComponent },
      { path: "datatarget-edit", component: DatatargetEditComponent },
      {
        path: "datatarget-edit/:datatargetId",
        component: DatatargetEditComponent,
      },
      {
        path: ":datatargetId",
        component: DatatargetDetailComponent,
        children: [
          { path: "datatarget-log", component: DatatargetLogComponent },
          { path: "datatarget-test-connection", component: DatatargetTestConnectionComponent },
          { path: "httppush-detail", component: HttppushDetailComponent },
          { path: "fiware-detail", component: FiwareDetailComponent },
          { path: "mqtt-detail", component: MqttDetailComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatatargetRoutingModule {}
