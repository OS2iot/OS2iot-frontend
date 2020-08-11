import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoraGatewayComponent } from './list-lora-gateway.component';

describe('ListLoraGatewayComponent', () => {
  let component: ListLoraGatewayComponent;
  let fixture: ComponentFixture<ListLoraGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoraGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoraGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
