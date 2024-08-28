import { Injectable } from "@angular/core";
import { RestService } from "../shared/services/rest.service";
import { Observable } from "rxjs";
import { ListAllSearchResultsResponseDto } from "./search-results.model";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  URL = "search";

  constructor(private restService: RestService) {}

  search(query: string, limit: number, offset: number): Observable<ListAllSearchResultsResponseDto> {
    return this.restService.get(this.URL, {
      q: query,
      limit: limit,
      offset: offset,
    });
  }
}
