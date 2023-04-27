import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
   @Output() load = new EventEmitter<void>();

  constructor() {}

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onScroll(event: Event): void {
    this.checkBottom();
  }

  private checkBottom() {
    const element = document.documentElement;
    const atBottom = element.scrollHeight - element.scrollTop  === element.clientHeight;
    const inView = element.scrollHeight - element.scrollTop  <= element.clientHeight;

    if ( atBottom || inView ) {
      this.load.emit();
    }
  }

}
