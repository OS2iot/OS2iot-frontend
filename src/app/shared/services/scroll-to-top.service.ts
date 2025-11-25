import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ScrollToTopService {
  constructor() {}

  scrollToTop(): void {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, 0);
      }
    })();
  }
}
