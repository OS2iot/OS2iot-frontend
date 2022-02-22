/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FiwareEditComponent } from './fiware-edit.component';

describe('FiwareEditComponent', () => {
  let component: FiwareEditComponent;
  let fixture: ComponentFixture<FiwareEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiwareEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiwareEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
