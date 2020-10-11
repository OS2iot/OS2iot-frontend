import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxGroupsListItemComponent } from './sigfox-groups-list-item.component';

describe('SigfoxGroupsListItemComponent', () => {
  let component: SigfoxGroupsListItemComponent;
  let fixture: ComponentFixture<SigfoxGroupsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxGroupsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxGroupsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
