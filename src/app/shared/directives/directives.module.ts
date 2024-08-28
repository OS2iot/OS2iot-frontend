import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceholderDirective } from "./placeholder.directive";
import { DragDropDirective } from "./drag-drop.directive";

@NgModule({
  declarations: [DropdownDirective, PlaceholderDirective, DragDropDirective],
  imports: [CommonModule],
  exports: [DropdownDirective, PlaceholderDirective, DragDropDirective],
})
export class DirectivesModule {}
