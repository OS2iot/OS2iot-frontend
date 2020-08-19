import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBodyLoraGatewayComponent } from './form-body-lora-gateway.component';

describe('FormBodyLoraGatewayComponent', () => {
  let component: FormBodyLoraGatewayComponent;
  let fixture: ComponentFixture<FormBodyLoraGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBodyLoraGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBodyLoraGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
