/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatatargetNewComponent } from './datatarget-new.component';

describe('DatatargetNewComponent', () => {
  let component: DatatargetNewComponent;
  let fixture: ComponentFixture<DatatargetNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatargetNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatargetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
