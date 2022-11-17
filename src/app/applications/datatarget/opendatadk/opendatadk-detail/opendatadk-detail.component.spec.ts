import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpendatadkDetailComponent } from './opendatadk-detail.component';

describe('OpendatadkDetailComponent', () => {
  let component: OpendatadkDetailComponent;
  let fixture: ComponentFixture<OpendatadkDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpendatadkDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpendatadkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
