import { Component, inject, Input } from "@angular/core";
import { ContactPerson } from "@app/contact-person/contact-person.model";
import { _, TranslatePipe, TranslateService } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { ContactPersonEditComponent } from "@app/contact-person/contact-person-edit.component";
import { DeleteDialogComponent } from "@shared/components/delete-dialog/delete-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "contact-person-list-edit",
  templateUrl: "./contact-person-list-edit.component.html",
  imports: [TranslatePipe, FormsModule, ContactPersonEditComponent],
})
export class ContactPersonListEditComponent {
  private translate = inject(TranslateService);

  // https://v17.angular.io/guide/component-interaction
  @Input() contactPersons: ContactPerson[];
  @Input() errorMessages: object;

  constructor(private dialog: MatDialog) {}

  addContactPerson(): void {
    this.contactPersons.push(new ContactPerson());
  }

  removeContactPerson(index: number, contactPerson: ContactPerson): () => void {
    return () => {
      // Ask for confirmation before removing an existing contact person.
      if (contactPerson.id) {
        const message = this.translate
          .get([
            _("APPLICATION.METADATA-FIELD.CONTACT-PERSONS-DELETE-CONFIRM"),
            _("GEN.NO")
          ], {
            name: contactPerson.name,
          })
          .subscribe((messages: string[]) => {
            console.log({messages})
            const dialog = this.dialog.open(DeleteDialogComponent, {
              data: {
                message: messages["APPLICATION.METADATA-FIELD.CONTACT-PERSONS-DELETE-CONFIRM"],
                showAccept: true,
                showCancel: true,
                cancelText: messages["GEN.NO"],
              },
            });

            dialog.afterClosed().subscribe(result => {
              if (result === true) {
                this.contactPersons.splice(index, 1);
              }
            });
          });
      } else {
        this.contactPersons.splice(index, 1);
      }
    };
  }
}
