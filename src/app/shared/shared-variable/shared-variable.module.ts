import { NgModule } from '@angular/core';
import { SharedVariableService } from './shared-variable.service';

@NgModule({})
export class SharedVariableModule {
  static forRoot() {
    return {
      ngModule: SharedVariableModule,
      providers: [SharedVariableService],
    };
  }
}
