import { ModuleWithProviders, NgModule } from "@angular/core";
import { SharedVariableService } from "./shared-variable.service";

@NgModule({})
export class SharedVariableModule {
  static forRoot(): ModuleWithProviders<SharedVariableModule> {
    return {
      ngModule: SharedVariableModule,
      providers: [SharedVariableService],
    };
  }
}
