import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxAdministrationItemComponent } from './sigfox-administration-item.component';

describe('SigfoxAdministrationItemComponent', () => {
  let component: SigfoxAdministrationItemComponent;
  let fixture: ComponentFixture<SigfoxAdministrationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxAdministrationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxAdministrationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
