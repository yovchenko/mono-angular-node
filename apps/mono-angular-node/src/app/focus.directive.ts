import {
  OnInit,
  OnDestroy,
  Directive,
  Input,
  EventEmitter,
  ElementRef,
  Renderer2,
  Inject
} from '@angular/core';
import { Subscription } from 'rxjs';


@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[focus]'
})
export class FocusDirective implements OnInit, OnDestroy {
  subscription: Subscription;
  @Input('focus') focusEvent: EventEmitter < boolean > ;
  constructor(@Inject(ElementRef) private element: ElementRef, 
  private renderer: Renderer2) {}

  ngOnInit(): void   {
    this.subscription = this.focusEvent.subscribe(() => {
      this.renderer.selectRootElement(this.element.nativeElement)
      .scrollIntoView({ behavior: 'smooth' })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}
