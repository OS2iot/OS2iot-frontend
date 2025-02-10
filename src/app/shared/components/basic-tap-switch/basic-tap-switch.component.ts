import { NgClass, NgStyle } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

export interface Counter {
  value: string;
  color: "default" | "warning" | "stable" | "alert";
}

export interface Icon {
  matSVGSrc: string;
  width?: number;
  height?: number;
}

export interface Tap {
  title: string;
  counters?: Counter[];
  icon?: Icon;
}

@Component({
  selector: "app-basic-tap-switch",
  standalone: true,
  imports: [MatButtonModule, NgClass, NgStyle, MatIcon],
  templateUrl: "./basic-tap-switch.component.html",
  styleUrl: "./basic-tap-switch.component.scss",
})
export class BasicTapSwitchComponent implements OnInit {
  ngOnInit(): void {
    this.currentStyles = {
      color: "",
    };
  }

  currentStyles: Record<string, string> = {};
  index: number = 0;
  @Input() taps!: Tap[];

  boxStyles: Record<string, string> = {};

  @Output() newItemEvent = new EventEmitter<number>();

  onClick(index: number) {
    this.index = index;
    this.newItemEvent.emit(index);
  }
}
