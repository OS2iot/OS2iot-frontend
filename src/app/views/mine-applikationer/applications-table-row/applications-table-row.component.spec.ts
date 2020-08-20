import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsTableRowComponent } from './applications-table-row.component';

describe('ApplicationTableRowComponent', () => {
  let component: ApplicationsTableRowComponent;
  let fixture: ComponentFixture<ApplicationsTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
