import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoraTableRowComponent } from './admin-lora-table-row.component';

describe('AdminLoraTableRowComponent', () => {
  let component: AdminLoraTableRowComponent;
  let fixture: ComponentFixture<AdminLoraTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoraTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoraTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
