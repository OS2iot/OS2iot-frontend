import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTableOtherComponent } from './applications-table.component

describe('ApplicationTableOtherComponent', () => {
  let component: ApplicationTableOtherComponent;
  let fixture: ComponentFixture<ApplicationTableOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationTableOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTableOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
