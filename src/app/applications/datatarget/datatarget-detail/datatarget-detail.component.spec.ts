import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatargetDetailComponent } from './datatarget-detail.component';

describe('DatatargetComponent', () => {
  let component: DatatargetDetailComponent;
  let fixture: ComponentFixture<DatatargetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatargetDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatargetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
