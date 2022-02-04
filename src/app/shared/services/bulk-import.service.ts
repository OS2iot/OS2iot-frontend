import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulkImportService {
  public readonly nextIotDeviceListIndex$: BehaviorSubject<number>  = new BehaviorSubject(0);

  constructor() { }
}
