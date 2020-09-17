import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupTabelComponent } from './usergroup-tabel.component';

describe('UsergroupTabelComponent', () => {
  let component: UsergroupTabelComponent;
  let fixture: ComponentFixture<UsergroupTabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergroupTabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
