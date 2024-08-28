import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  getClientErrorMessage(error: Error): string {
    return error.message ? "Client error: " + error.message : error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ? "Server error: " + error.message : "No Internet Connection";
  }
}
