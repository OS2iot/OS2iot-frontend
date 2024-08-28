import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[detail-component]",
})
export class DatatargetDetailTypeSelectorDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
