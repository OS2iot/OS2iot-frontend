import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

// Components
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SearchModule } from "@app/search/search.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { AlertComponent } from "./components/alert/alert.component";
import { BatteriStatusComponent } from "./components/batteri-status/batteri-status.component";
import { ColumnSelectorComponent } from "./components/column-selector/column-selector.component";
import { DeleteDialogComponent } from "./components/delete-dialog/delete-dialog.component";
import { DynamicImgComponent } from "./components/dynamic-img/dynamic-img.component";
import { GeneralDetailsComponent } from "./components/general-details/general-details.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { MapComponent } from "./components/map/map.component";
import { MetadataDetailsComponent } from "./components/metadata-details/metadata-details.component";
import { TopBarTableComponent } from "./components/top-bar-table/top-bar-table.component";
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { DirectivesModule } from "./directives/directives.module";
import { NGMaterialModule } from "./Modules/materiale.module";
import { PipesModule } from "./pipes/pipes.module";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    BatteriStatusComponent,
    MapComponent,
    DeleteDialogComponent,
    TopBarComponent,
    TopBarTableComponent,
    GeneralDetailsComponent,
    DynamicImgComponent,
    MetadataDetailsComponent,
    ColumnSelectorComponent,
  ],
  imports: [
    DirectivesModule,
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    NGMaterialModule,
    FontAwesomeModule,
    PipesModule,
    SearchModule,
    MatIconModule,
  ],
  exports: [
    AlertComponent,
    TranslateModule,
    LoadingSpinnerComponent,
    BatteriStatusComponent,
    MapComponent,
    DeleteDialogComponent,
    TopBarComponent,
    TopBarTableComponent,
    GeneralDetailsComponent,
    DynamicImgComponent,
    MetadataDetailsComponent,
    ColumnSelectorComponent,
  ],
})
export class SharedModule {}
