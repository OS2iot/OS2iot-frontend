import { NgClass, NgOptimizedImage } from "@angular/common";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

export interface Counter {
  value: string;
  color: "default" | "warning" | "stable" | "alert";
}

export interface Icon {
  iconSrc?: string;
  width: number;
  height: number;
}

export interface Tap {
  Title: string;
  counters?: Counter[];
  icon?: Icon;
}

export interface isActive {
  isActive: boolean;
}

@Component({
  selector: "app-basic-tap-switch",
  standalone: true,
  imports: [MatButtonModule, NgClass, NgOptimizedImage],
  templateUrl: "./basic-tap-switch.component.html",
  styleUrl: "./basic-tap-switch.component.scss",
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BasicTapSwitchComponent {
  index: number = 0;
  @Input() taps!: Tap[];

  boxStyles: Record<string, string> = {};

  @Output() newItemEvent = new EventEmitter<number>();

  onClick(index: number) {
    this.index = index;
    this.newItemEvent.emit(index);
  }

  onTap;
}
