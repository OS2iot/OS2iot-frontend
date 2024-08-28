import { Component } from "@angular/core";
import { LoggedInService } from "@shared/services/loggedin.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "OS2IoT-frontend";
  isLoggedIn = true;

  constructor(private loggedInService: LoggedInService) {
    loggedInService.changeEmitted?.subscribe(change => {
      this.isLoggedIn = change;
    });
  }
}
