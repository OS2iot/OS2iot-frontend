/* tslint:disable:no-unused-variable */

import { ViewContainerRef } from "@angular/core";
import { DatatargetDetailTypeSelectorDirective } from "./datatarget-detail-type-selector.directive";
let viewContainerRef: ViewContainerRef;
describe("Directive: DatatargetDetailTypeSelector", () => {
  it("should create an instance", () => {
    const directive = new DatatargetDetailTypeSelectorDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
