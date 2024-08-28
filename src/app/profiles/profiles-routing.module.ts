import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfilesComponent } from "./profiles.component";
import { ProfilesListComponent } from "./profiles-list/profiles-list.component";
import { DeviceProfilesEditComponent } from "./device-profiles/device-profiles-edit/device-profiles-edit.component";

const profilesRoutes: Routes = [
  {
    path: "",
    component: ProfilesComponent,
    children: [
      { path: "", component: ProfilesListComponent },
      { path: "device-profile/edit", component: DeviceProfilesEditComponent },
      { path: "device-profile/new-device-profile", component: DeviceProfilesEditComponent },
      { path: "device-profile/:deviceId", component: DeviceProfilesEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(profilesRoutes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
