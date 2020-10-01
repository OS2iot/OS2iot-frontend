import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxProfilesEditComponent } from './sigfox-profiles-edit.component';

describe('SigfoxProfilesEditComponent', () => {
  let component: SigfoxProfilesEditComponent;
  let fixture: ComponentFixture<SigfoxProfilesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxProfilesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxProfilesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
