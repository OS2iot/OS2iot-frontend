import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appPlaceholder]",
  standalone: false,
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
