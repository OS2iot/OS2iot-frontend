import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[edit-component]'
})
export class DatatargetEditTypeSelectorDirective  {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
