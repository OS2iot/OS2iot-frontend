import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxProfilesListComponent } from './sigfox-profiles-list.component';

describe('SigfoxProfilesListComponent', () => {
  let component: SigfoxProfilesListComponent;
  let fixture: ComponentFixture<SigfoxProfilesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxProfilesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxProfilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
