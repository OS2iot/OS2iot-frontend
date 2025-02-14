import { Location, NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Router } from "@angular/router";

export interface Counter {
  value: string;
  color: "default" | "warning" | "stable" | "alert";
}

export interface Icon {
  matSVGSrc: string;
  width?: number;
  height?: number;
}

export interface Tab {
  title: string;
  counters?: Counter[];
  icon?: Icon;
  uri: string;
}

@Component({
  selector: "app-basic-tap-switch",
  standalone: true,
  imports: [MatButtonModule, NgClass, MatIcon],
  templateUrl: "./basic-tap-switch.component.html",
  styleUrl: "./basic-tap-switch.component.scss",
})
export class BasicTapSwitchComponent {
  @Input() currentUrl: string;
  @Input() tabs: Tab[];

  @Output() tabClicked = new EventEmitter<string>();

  constructor(private router: Router, private _location: Location) {}

  onClick(uri: string) {
    this._location.go(uri);
    this.tabClicked.emit(uri);
  }
}
