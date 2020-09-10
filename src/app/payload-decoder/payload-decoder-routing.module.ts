import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PayloadDecoderComponent } from './payload-decoder/payload-decoder.component';
import { PayloadDecoderEditComponent } from './payload-decoder/payload-decoder-edit/payload-decoder-edit.component';
import { PayloadDecoderDetailComponent } from './payload-decoder/payload-decoder-detail/payload-decoder-detail.component';
import { PayloadDecoderListComponent } from './payload-decoder/payload-decoder-list/payload-decoder-list.component';
import { PayloadDecoderResolverService } from './payload-decoder-resolver.service';

const routes: Routes = [
    {
        path: '', component: PayloadDecoderComponent,
        children: [
            {path: '', component: PayloadDecoderListComponent},
            {path: 'payload-decoder-edit', component: PayloadDecoderEditComponent},
            {path: 'payload-decoder-edit/:id', component: PayloadDecoderEditComponent},
            {path: 'payload-decoder-detail/:id', component: PayloadDecoderDetailComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PayloadDecoderRoutingModule { }
