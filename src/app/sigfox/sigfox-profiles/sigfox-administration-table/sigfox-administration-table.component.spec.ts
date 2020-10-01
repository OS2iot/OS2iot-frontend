import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxAdministrationTableComponent } from './sigfox-administration-table.component';

describe('SigfoxAdministrationTableComponent', () => {
  let component: SigfoxAdministrationTableComponent;
  let fixture: ComponentFixture<SigfoxAdministrationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxAdministrationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxAdministrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
