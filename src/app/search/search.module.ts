import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "../search/search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormModule } from "@shared/components/forms/form.module";
import { SearchTableComponent } from "./search-table/search-table.component";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { SharedModule } from "@shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [SearchComponent, SearchTableComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        FormModule,
        NGMaterialModule,
        SharedModule,
        FontAwesomeModule,
    ],
})
export class SearchModule {}
