import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogComponent } from "@shared/components/delete-dialog/delete-dialog.component";
import { KeyValue } from "@shared/types/tuple.type";

@Component({
    // Require this tag to be used with <tr> to preserve global table styling
    // tslint:disable-next-line: component-selector
    selector: "tr[app-form-key-value-pair]",
    templateUrl: "./form-key-value-pair.component.html",
    styleUrls: ["./form-key-value-pair.component.scss"],
    standalone: false
})
export class FormKeyValuePairComponent implements OnInit {
  @Input() id: number;
  @Input() pair: KeyValue;
  @Input() errorFieldId: string | undefined;
  @Output() deletePair: EventEmitter<number> = new EventEmitter();

  faTimesCircle = faTimesCircle;
  private deleteMessage: string;

  constructor(private dialog: MatDialog, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.get(["DIALOG.DELETE.ARE-YOU-SURE"]).subscribe(translations => {
      this.deleteMessage = translations["DIALOG.DELETE.ARE-YOU-SURE"];
    });
  }

  openDeleteDialog() {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        showAccept: true,
        showCancel: true,
        message: this.deleteMessage,
      },
    });

    dialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.deletePair.emit(this.id);
      }
    });
  }
}
