import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    timer(0).subscribe(() => {
      this.elementRef.nativeElement.focus();
    });
  }
}
