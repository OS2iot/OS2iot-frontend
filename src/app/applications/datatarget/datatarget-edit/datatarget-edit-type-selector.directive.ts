import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[edit-component]",
  standalone: false,
})
export class DatatargetEditTypeSelectorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
