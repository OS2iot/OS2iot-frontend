import { NgModule } from '@angular/core';
import { SharedVariableService } from '@app/shared-variable/shared-variable.service';

@NgModule({})
export class SharedVariableModule {
  static forRoot() {
    return {
      ngModule: SharedVariableModule,
      providers: [SharedVariableService],
    };
  }
}
