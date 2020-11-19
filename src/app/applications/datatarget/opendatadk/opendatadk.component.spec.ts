import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendatadkComponent } from './opendatadk.component';

describe('OpendatadkComponent', () => {
  let component: OpendatadkComponent;
  let fixture: ComponentFixture<OpendatadkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpendatadkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpendatadkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
