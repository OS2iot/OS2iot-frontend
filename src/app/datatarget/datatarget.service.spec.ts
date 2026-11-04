import { TestBed } from "@angular/core/testing";

import { DatatargetService } from "./datatarget.service";

describe("DatatargetService", () => {
  let service: DatatargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatatargetService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
