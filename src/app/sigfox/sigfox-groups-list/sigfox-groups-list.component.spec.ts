import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxGroupsListComponent } from './sigfox-groups-list.component';

describe('SigfoxGroupsListComponent', () => {
  let component: SigfoxGroupsListComponent;
  let fixture: ComponentFixture<SigfoxGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
