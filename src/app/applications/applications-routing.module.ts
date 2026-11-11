import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IotDeviceDataPacketsTabComponent } from "@applications/iot-devices/iot-device-detail/iot-device-data-packets-tab/iot-device-data-packets-tab.component";
import { IotDeviceDetailsTabComponent } from "@applications/iot-devices/iot-device-detail/iot-device-details-tab/iot-device-details-tab.component";
import { IotDeviceDownlinkTabComponent } from "@applications/iot-devices/iot-device-detail/iot-device-downlink-tab/iot-device-downlink-tab.component";
import { IotDeviceHistoryTabComponent } from "@applications/iot-devices/iot-device-detail/iot-device-history-tab/iot-device-history-tab.component";
import { IotDevicesTabComponent } from "@applications/iot-devices/iot-devices-tab/iot-devices-tab.component";
import { MulticastTabComponent } from "@applications/multicast/multicast-tab/multicast-tab.component";
import { ApplicationDetailComponent } from "./application-detail/application-detail.component";
import { ApplicationEditComponent } from "./application-edit/application-edit.component";
import { ApplicationsListComponent } from "./applications-list/applications-list.component";
import { ApplicationsComponent } from "./applications.component";
import { BulkImportComponent } from "./bulk-import/bulk-import.component";
import { IoTDeviceDetailComponent } from "./iot-devices/iot-device-detail/iot-device-detail.component";
import { IotDeviceEditComponent } from "./iot-devices/iot-device-edit/iot-device-edit.component";
import { MulticastDetailComponent } from "./multicast/multicast-detail/multicast-detail.component";
import { MulticastEditComponent } from "./multicast/multicast-edit/multicast-edit.component";
import { IotDeviceCopyComponent } from "./iot-devices/iot-device-copy/iot-device-copy.component";
import { DatatargetTabComponent } from "@applications/datatarget/datatarget-tab/datatarget-tab.component";
import { DatatargetConnectionEditComponent } from "@applications/datatarget/datatarget-connection-edit/datatarget-connection-edit.component";

const applicationRoutes: Routes = [
  {
    path: "",
    component: ApplicationsComponent,
    children: [
      { path: "", component: ApplicationsListComponent },
      { path: "map", component: ApplicationsListComponent },
      { path: "new-application", component: ApplicationEditComponent },
      { path: "edit-application/:id", component: ApplicationEditComponent },
      {
        path: ":id",
        children: [
          {
            path: "",
            component: ApplicationDetailComponent,
            children: [
              { path: "iot-devices", component: IotDevicesTabComponent },
              { path: "multicast-groups", component: MulticastTabComponent },
              { path: "data-targets", component: DatatargetTabComponent },
            ],
          },
          { path: "new-iot-device", component: IotDeviceEditComponent },
          {
            path: "iot-device-edit/:deviceId",
            component: IotDeviceEditComponent,
          },
          {
            path: "iot-device/:deviceId",
            component: IoTDeviceDetailComponent,
            children: [
              { path: "details", component: IotDeviceDetailsTabComponent },
              { path: "history", component: IotDeviceHistoryTabComponent },
              {
                path: "data-packets",
                component: IotDeviceDataPacketsTabComponent,
              },
              {
                path: "downlink",
                component: IotDeviceDownlinkTabComponent,
              },
            ],
          },
          {
            path: "iot-device-copy/:deviceId",
            component: IotDeviceCopyComponent,
          },
          { path: "datatarget-new-connection", component: DatatargetConnectionEditComponent },
          { path: "datatarget-edit-connection/:connectionId", component: DatatargetConnectionEditComponent },
          { path: "multicast-edit", component: MulticastEditComponent },
          {
            path: "multicast-edit/:multicastId",
            component: MulticastEditComponent,
          },
          {
            path: "multicast/:multicastId",
            component: MulticastDetailComponent,
          },
          { path: "bulk-import", component: BulkImportComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(applicationRoutes)],
  exports: [RouterModule],
})
export class ApplicaitonsRoutingModule {}
