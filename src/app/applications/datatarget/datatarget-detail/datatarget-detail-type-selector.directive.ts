import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[detail-component]",
    standalone: false
})
export class DatatargetDetailTypeSelectorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
