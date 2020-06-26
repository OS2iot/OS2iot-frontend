import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleIotEnhederComponent } from './alle-iot-enheder.component';

describe('AlleIotEnhederComponent', () => {
  let component: AlleIotEnhederComponent;
  let fixture: ComponentFixture<AlleIotEnhederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlleIotEnhederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlleIotEnhederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
