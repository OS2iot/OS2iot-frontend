import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PayloadDecoderDetailComponent } from "./payload-decoder-detail/payload-decoder-detail.component";
import { PayloadDecoderEditComponent } from "./payload-decoder-edit/payload-decoder-edit.component";
import { PayloadDecoderListComponent } from "./payload-decoder-list/payload-decoder-list.component";
import { PayloadDecoderComponent } from "./payload-decoder.component";

const routes: Routes = [
  {
    path: "",
    component: PayloadDecoderComponent,
    children: [
      { path: "", component: PayloadDecoderListComponent },
      { path: "payload-decoder-edit", component: PayloadDecoderEditComponent },
      { path: "payload-decoder-edit/:id", component: PayloadDecoderEditComponent },
      { path: "payload-decoder-detail/:id", component: PayloadDecoderDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayloadDecoderRoutingModule {}
