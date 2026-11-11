/* tslint:disable:no-unused-variable */

import { ViewContainerRef } from "@angular/core";
import { DatatargetEditTypeSelectorDirective } from "./datatarget-edit-type-selector.directive";

let viewContainerRef: ViewContainerRef;
describe("Directive: DatatargetEditTypeSelector", () => {
  it("should create an instance", () => {
    const directive = new DatatargetEditTypeSelectorDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
