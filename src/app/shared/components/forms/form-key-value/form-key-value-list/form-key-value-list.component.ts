import { Component, Input, OnInit } from '@angular/core';

interface KeyValue {
  key?: string;
  value?: string;
}

@Component({
  selector: 'app-form-key-value-list',
  templateUrl: './form-key-value-list.component.html',
  styleUrls: ['./form-key-value-list.component.scss'],
})
export class FormKeyValueListComponent implements OnInit {
  @Input() tags: KeyValue[] = [{}];

  constructor() {}

  ngOnInit(): void {}

  addNewTag(): void {
    this.tags.push({});
  }

  deleteTag(id: number): void {
    this.tags = this.tags.filter((_tag, i) => i !== id);
  }
}
