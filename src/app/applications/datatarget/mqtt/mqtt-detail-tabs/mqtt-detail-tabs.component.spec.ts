import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MqttDetailTabsComponent } from "./mqtt-detail-tabs.component";

describe("MqttDetailTabsComponent", () => {
  let component: MqttDetailTabsComponent;
  let fixture: ComponentFixture<MqttDetailTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MqttDetailTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MqttDetailTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
