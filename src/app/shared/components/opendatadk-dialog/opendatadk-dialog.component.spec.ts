import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendatadkDialogComponent } from './opendatadk-dialog.component';

describe('OpendatadkDialogComponent', () => {
  let component: OpendatadkDialogComponent;
  let fixture: ComponentFixture<OpendatadkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpendatadkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpendatadkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
