import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { SearchTableRowComponent } from './search-table/search-table-row/search-table-row.component';
import { SearchTableComponent } from './search-table/search-table.component';

@NgModule({
  declarations: [SearchComponent, SearchTableComponent, SearchTableRowComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    TopBarModule,
    ReactiveFormsModule,
    FormModule,
  ],
})
export class SearchModule {}
