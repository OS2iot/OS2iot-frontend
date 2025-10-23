import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { OddkMailInfo } from "@applications/datatarget/datatarget.model";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
  selector: "app-opendatadk-mail-dialog",
  templateUrl: "./opendatadk-mail-dialog.html",
  styleUrls: ["./opendatadk-mail-dialog.scss"],
  standalone: false,
})
export class OpenDataDkMailDialogComponent {
  sendAttempted: boolean = false;
  organizationInput: string = "";
  commentInput: string = "";

  selectedOrganizationName: string;

  constructor(
    public dialog: MatDialogRef<OpenDataDkMailDialogComponent, OddkMailInfo>,
    private sharedVariableService: SharedVariableService
  ) {
    const selectedOrganisationId = sharedVariableService.getSelectedOrganisationId();
    this.selectedOrganizationName = sharedVariableService
      .getOrganizationInfo()
      ?.find(o => o.id === selectedOrganisationId)?.name;
  }

  send() {
    this.sendAttempted = true;
    if (this.organizationInput) {
      this.dialog.close({
        organizationId: this.sharedVariableService.getSelectedOrganisationId(),
        organizationOddkAlias: this.organizationInput,
        comment: this.commentInput || undefined,
      });
    }
  }
}
