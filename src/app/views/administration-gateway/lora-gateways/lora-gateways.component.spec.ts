import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineLoraGatewaysComponent } from './lora-gateways.component';

describe('MineLoraGatewaysComponent', () => {
  let component: MineLoraGatewaysComponent;
  let fixture: ComponentFixture<MineLoraGatewaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MineLoraGatewaysComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineLoraGatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
