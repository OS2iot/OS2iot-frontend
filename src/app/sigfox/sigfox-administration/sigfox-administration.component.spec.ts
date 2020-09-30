import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxAdministrationComponent } from './sigfox-administration.component';

describe('SigfoxAdministrationComponent', () => {
  let component: SigfoxAdministrationComponent;
  let fixture: ComponentFixture<SigfoxAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
