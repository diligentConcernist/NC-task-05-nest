import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[comment]"
})
export class CommentDirective {
  @Input() comment: string = "";

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener("mouseenter")
  public onMouseEnter(): void {
    this.leaveComment(true);
  }

  private leaveComment(value: boolean): void {
    if (value) {
      let customComment: string = "";
      if (Number(this.comment) === 0) {
        customComment = "Что ты здесь делаешь?";
      } else if (Number(this.comment) <= 1) {
        customComment = "Чел, ты на грани";
      } else if (Number(this.comment) <= 2) {
        customComment = "Это неприемлимо";
      } else if (Number(this.comment) <= 3) {
        customComment = "Да ты скатываешься!";
      } else if (Number(this.comment) < 4) {
        customComment = "В принципе средне";
      } else if (Number(this.comment) <= 4.85) {
        customComment = "Хорошая работа!";
      } else if (Number(this.comment) < 5) {
        customComment = "Молодец!";
      } else {
        customComment = "У тебя вообще жизнь есть?";
      }
      this.renderer.setAttribute(this.element.nativeElement, "title", customComment);
    }
  }
}
