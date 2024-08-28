import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { download, Download } from "../helpers/download.helper";
import { Observable } from "rxjs";
import { SAVER, Saver } from "../providers/saver.provider";

@Injectable({ providedIn: "root" })
export class DownloadService {
    constructor(private http: HttpClient, @Inject(SAVER) private save: Saver) {}

    download(url: string, filename?: string): Observable<Download> {
        return this.http
            .get(url, {
                reportProgress: true,
                observe: "events",
                responseType: "blob",
            })
            .pipe(download(blob => this.save(blob, filename)));
    }

    blob(url: string, filename?: string): Observable<Blob> {
        return this.http.get(url, {
            responseType: "blob",
        });
    }
}
