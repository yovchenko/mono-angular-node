import {
  Directive,
  Input,
  EventEmitter,
  ElementRef,
  Renderer2,
  Inject
} from '@angular/core';


@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[focus]'
})
export class FocusDirective {
  @Input('focus') focusEvent: EventEmitter < boolean > ;
  constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void   {
    this.focusEvent.subscribe(() => {
      this.renderer.selectRootElement(this.element.nativeElement).scrollIntoView()
    });
  }
}
