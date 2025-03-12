import { Directive } from '@angular/core';

/**
 * This directive is used to define a slide in a carousel.
 */

@Directive({
  selector: '[carouselSlide]',
  standalone: true,
})
export class CarouselSlideDirective {
  constructor() {}
}
