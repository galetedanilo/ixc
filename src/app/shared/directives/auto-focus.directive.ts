import { Directive, AfterViewInit, ElementRef } from "@angular/core";

@Directive({
  selector: '[autofocus]',
  standalone: true
})
export class AutoFocus implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}
