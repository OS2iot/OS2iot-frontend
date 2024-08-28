import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class GatewayService {
  organisationChangeSubject: Subject<number> = new Subject();
  isGatewayStatusVisibleSubject: Subject<void> = new Subject();
  selectedOrg: number;
}
