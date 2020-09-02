import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatargetComponent } from './datatarget.component';

describe('DatatargetComponent', () => {
  let component: DatatargetComponent;
  let fixture: ComponentFixture<DatatargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
