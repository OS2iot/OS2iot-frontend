/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttppushEditComponent } from './httppush-edit.component';

describe('HttppushEditComponent', () => {
  let component: HttppushEditComponent;
  let fixture: ComponentFixture<HttppushEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttppushEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttppushEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
