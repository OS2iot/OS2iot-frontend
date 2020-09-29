import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatargetTableRowComponent } from './datatarget-tabel-row.component';

describe('DatatargetTabelRowComponent', () => {
  let component: DatatargetTableRowComponent;
  let fixture: ComponentFixture<DatatargetTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatargetTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatargetTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
