import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { sortBy } from "@shared/helpers/array.helper";
import { ReceivedMessageMetadata } from "@shared/models/received-message-metadata.model";

@Component({
    selector: "app-data-packages-timestamp",
    templateUrl: "./data-packages-timestamp.component.html",
    styleUrls: ["./data-packages-timestamp.component.scss"],
    standalone: false
})
export class DataPackagesTimestampComponent implements OnInit, OnChanges {
  @Input() receivedMessagesMetadata: ReceivedMessageMetadata[] = [];
  sortedMetadata: ReceivedMessageMetadata[] = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { receivedMessagesMetadata } = changes;
    if (receivedMessagesMetadata.currentValue !== receivedMessagesMetadata.previousValue) {
      this.sortedMetadata = sortBy(receivedMessagesMetadata.currentValue, "sentTime", "desc");
    }
  }
}
