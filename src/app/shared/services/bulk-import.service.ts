import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class BulkImportService {
    public readonly nextCreateIotDeviceBatchIndex$: Subject<void> = new Subject();
    public readonly nextUpdateDeviceBatchIndex$: Subject<void> = new Subject();

    constructor() {}
}
