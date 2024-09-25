import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-datatarget-test-connection",
  templateUrl: "./datatarget-test-connection.component.html",
  styleUrl: "./datatarget-test-connection.component.scss",
})
export class DatatargetTestConnectionComponent implements OnInit {

  codeOutput = ""
  editorJsonOutpuOptions = {
    theme: "vs",
    language: "json",
    autoIndent: true,
    roundedSelection: true,
    minimap: { enabled: false },
    readOnly: true,
  };
  constructor() {}

  ngOnInit(): void {}
}
