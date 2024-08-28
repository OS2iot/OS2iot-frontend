import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Components
import { TranslateModule } from "@ngx-translate/core";
import { DirectivesModule } from "./directives/directives.module";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { AlertComponent } from "./components/alert/alert.component";
import { BatteriStatusComponent } from "./components/batteri-status/batteri-status.component";
import { MapComponent } from "./components/map/map.component";
import { NGMaterialModule } from "./Modules/materiale.module";
import { DeleteDialogComponent } from "./components/delete-dialog/delete-dialog.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { TopBarTableComponent } from "./components/top-bar-table/top-bar-table.component";
import { GeneralDetailsComponent } from "./components/general-details/general-details.component";
import { PipesModule } from "./pipes/pipes.module";
import { DynamicImgComponent } from "./components/dynamic-img/dynamic-img.component";
import { MetadataDetailsComponent } from "./components/metadata-details/metadata-details.component";
import { ColumnSelectorComponent } from "./components/column-selector/column-selector.component";

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
