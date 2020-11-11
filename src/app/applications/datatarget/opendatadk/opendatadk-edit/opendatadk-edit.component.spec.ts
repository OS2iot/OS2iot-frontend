import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendatadkEditComponent } from './opendatadk-edit.component';

describe('OpendatadkEditComponent', () => {
  let component: OpendatadkEditComponent;
  let fixture: ComponentFixture<OpendatadkEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpendatadkEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpendatadkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
