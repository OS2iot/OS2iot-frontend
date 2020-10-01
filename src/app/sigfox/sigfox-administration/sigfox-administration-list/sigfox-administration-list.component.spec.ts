import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigfoxAdministrationListComponent } from './sigfox-administration-list.component';

describe('SigfoxAdministrationListComponent', () => {
  let component: SigfoxAdministrationListComponent;
  let fixture: ComponentFixture<SigfoxAdministrationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigfoxAdministrationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigfoxAdministrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
