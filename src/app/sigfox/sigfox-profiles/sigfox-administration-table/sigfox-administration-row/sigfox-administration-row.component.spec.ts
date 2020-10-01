import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxAdministrationRowComponent } from './sigfox-administration-row.component';

describe('SigfoxAdministrationRowComponent', () => {
  let component: SigfoxAdministrationRowComponent;
  let fixture: ComponentFixture<SigfoxAdministrationRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxAdministrationRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxAdministrationRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
