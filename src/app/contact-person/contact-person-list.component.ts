import { Component, Input } from "@angular/core";
import { ContactPerson } from "@app/contact-person/contact-person.model";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "contact-person-list",
  templateUrl: "./contact-person-list.component.html",
  imports: [FormsModule],
})
export class ContactPersonListComponent {
  @Input() contactPersons: ContactPerson[];
}
