import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLandingComponent } from './carousel-landing.component';

describe('CarouselLandingComponent', () => {
  let component: CarouselLandingComponent;
  let fixture: ComponentFixture<CarouselLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
