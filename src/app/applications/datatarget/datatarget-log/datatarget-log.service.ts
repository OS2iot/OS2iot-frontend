import { Injectable } from "@angular/core";
import { RestService } from "@shared/services/rest.service";
import { Observable } from "rxjs";
import { DatatargetLog } from "./datatarget-log.model";

const baseUrl = "datatarget-log";

@Injectable({
  providedIn: "root",
})
export class DatatargetLogService {
  constructor(private restService: RestService) {}

  get(id: number): Observable<DatatargetLog[]> {
    return this.restService.get(baseUrl, null, id);
  }
}
