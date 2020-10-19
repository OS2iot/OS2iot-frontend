import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteriStatusComponent } from './batteri-status.component';

describe('BatteriStatusComponent', () => {
  let component: BatteriStatusComponent;
  let fixture: ComponentFixture<BatteriStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatteriStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteriStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
