import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxGroupsEditComponent } from './sigfox-groups-edit.component';

describe('SigfoxGroupsEditComponent', () => {
  let component: SigfoxGroupsEditComponent;
  let fixture: ComponentFixture<SigfoxGroupsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxGroupsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxGroupsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
