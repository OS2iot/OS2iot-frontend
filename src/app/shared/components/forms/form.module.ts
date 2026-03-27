import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslatePipe } from "@ngx-translate/core";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { FormBodyApplicationComponent } from "./form-body-application/form-body-application.component";
import { FormHeaderComponent } from "./form-header/form-header.component";
import { FormKeyValuePairComponent } from "./form-key-value/form-key-value-pair/form-key-value-pair.component";
import { FormKeyValueListComponent } from "./form-key-value/form-key-value-list/form-key-value-list.component";
import { MatSelectSearchModule } from "@shared/components/mat-select-search/mat-select-search.module";
import { ContactPersonEditComponent } from "@app/contact-person/contact-person-edit.component";
import { ContactPersonListEditComponent } from "@app/contact-person/contact-person-list-edit.component";
import { StatusIconComponent } from "@shared/components/status-icon/status-icon.component";

@NgModule({
  declarations: [
    FormHeaderComponent,
    FormBodyApplicationComponent,
    FormKeyValuePairComponent,
    FormKeyValueListComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    NGMaterialModule,
    MatSelectSearchModule,
    ContactPersonEditComponent,
    ContactPersonListEditComponent,
    StatusIconComponent,
  ],
  exports: [FormHeaderComponent, FormBodyApplicationComponent, FormKeyValuePairComponent, FormKeyValueListComponent],
  providers: [],
})
export class FormModule {}
