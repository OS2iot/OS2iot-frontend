import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslatePipe } from "@ngx-translate/core";
import { FormModule } from "@shared/components/forms/form.module";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { SearchTableComponent } from "./search-table.component";

@NgModule({
  declarations: [SearchTableComponent],
  imports: [
    CommonModule,
    TranslatePipe,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    NGMaterialModule,
    FontAwesomeModule,
  ],
  exports: [SearchTableComponent],
})
export class SearchModule {}
