import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationTabelComponent } from './organisation-tabel.component';

describe('OrganisationTabelComponent', () => {
  let component: OrganisationTabelComponent;
  let fixture: ComponentFixture<OrganisationTabelComponent>;

  beforeEach(async(() => {
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
