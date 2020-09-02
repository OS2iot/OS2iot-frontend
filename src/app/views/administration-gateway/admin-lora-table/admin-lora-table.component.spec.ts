import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoraTableComponent } from './admin-lora-table.component';

describe('AdminLoraTableComponent', () => {
  let component: AdminLoraTableComponent;
  let fixture: ComponentFixture<AdminLoraTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoraTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoraTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
