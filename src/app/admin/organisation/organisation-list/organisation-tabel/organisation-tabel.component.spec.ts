import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganisationTabelComponent } from './organisation-tabel.component';

describe('OrganisationTabelComponent', () => {
  let component: OrganisationTabelComponent;
  let fixture: ComponentFixture<OrganisationTabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationTabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
