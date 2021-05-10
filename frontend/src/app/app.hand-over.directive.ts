import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[hand_over]"
})
export class HandOverDirective {


  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener("mouseenter")
  public onMouseEnter(): void {
    this.setToHighlighted(true);
  }

  @HostListener("mouseleave")
  public onMouseLeave(): void {
    this.setToHighlighted(false);
  }

  private setToHighlighted(value: boolean): void {
    if (value) {
      this.renderer.setStyle(this.element.nativeElement, "border",
        "2px solid rgb(199, 195, 195)");
      this.renderer.setStyle(this.element.nativeElement, "font-weight", "bold");

    } else {
      this.renderer.setStyle(this.element.nativeElement, "border",
        "none");
      this.renderer.setStyle(this.element.nativeElement, "font-weight", "normal");
    }
  }
}
