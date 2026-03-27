import { Component, inject, Input } from "@angular/core";
import { ContactPerson } from "@app/contact-person/contact-person.model";
import { FormsModule } from "@angular/forms";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { NgClass } from "@angular/common";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "contact-person-edit",
  templateUrl: "./contact-person-edit.component.html",
  imports: [TranslatePipe, FormsModule, NgClass, FaIconComponent],
})
export class ContactPersonEditComponent {
  private translate = inject(TranslateService);

  // https://v17.angular.io/guide/component-interaction
  @Input() index!: number;
  @Input() errorMessages: object;
  @Input() contactPerson: ContactPerson;
  @Input() removeContactPerson: () => void;

  constructor() {}

  protected readonly faTimesCircle = faTimesCircle;
}
