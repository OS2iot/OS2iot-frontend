import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineApplikationerComponent } from './mine-applikationer.component';

describe('MineApplikationerComponent', () => {
  let component: MineApplikationerComponent;
  let fixture: ComponentFixture<MineApplikationerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineApplikationerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineApplikationerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
