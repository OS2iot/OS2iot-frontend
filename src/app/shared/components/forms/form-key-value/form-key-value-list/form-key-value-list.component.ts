import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { KeyValue } from "@shared/types/tuple.type";

@Component({
    selector: "app-form-key-value-list",
    templateUrl: "./form-key-value-list.component.html",
    styleUrls: ["./form-key-value-list.component.scss"],
    standalone: false
})
export class FormKeyValueListComponent implements OnInit {
  @Input() tags: KeyValue[] = [{}];
  @Output() tagsChange = new EventEmitter<KeyValue[]>();
  @Input() errorFieldId: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  addNewTag(): void {
    this.tags.push({});
  }

  deleteTag(id: number): void {
    const newTags = this.tags.filter((_tag, i) => i !== id);
    // Update parent with a tag less and banana-in-a-box binding (in html) for the update to propagate 2-way
    this.tagsChange.emit(newTags);
  }
}
