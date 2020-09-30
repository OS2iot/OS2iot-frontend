import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxProfilesComponent } from './sigfox-profiles.component';

describe('SigfoxProfilesComponent', () => {
  let component: SigfoxProfilesComponent;
  let fixture: ComponentFixture<SigfoxProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
