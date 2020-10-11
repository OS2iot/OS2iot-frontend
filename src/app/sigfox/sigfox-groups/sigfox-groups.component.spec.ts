import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxGroupsComponent } from './sigfox-groups.component';

describe('SigfoxGroupsComponent', () => {
  let component: SigfoxGroupsComponent;
  let fixture: ComponentFixture<SigfoxGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
