import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-payload-decoder",
  templateUrl: "./payload-decoder.component.html",
  styleUrls: ["./payload-decoder.component.scss"],
})
export class PayloadDecoderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData() {}
}
