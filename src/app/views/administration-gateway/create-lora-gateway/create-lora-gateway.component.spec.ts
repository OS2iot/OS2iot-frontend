import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoraGatewayComponent } from './create-lora-gateway.component';

describe('CreateLoraGatewayComponent', () => {
  let component: CreateLoraGatewayComponent;
  let fixture: ComponentFixture<CreateLoraGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLoraGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoraGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
