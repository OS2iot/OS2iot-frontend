import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxGroupsDetailComponent } from './sigfox-groups-detail.component';

describe('SigfoxGroupsDetailComponent', () => {
  let component: SigfoxGroupsDetailComponent;
  let fixture: ComponentFixture<SigfoxGroupsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxGroupsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxGroupsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
