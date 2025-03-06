import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsLandingComponent } from './socials-landing.component';

describe('SocialsLandingComponent', () => {
  let component: SocialsLandingComponent;
  let fixture: ComponentFixture<SocialsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialsLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
