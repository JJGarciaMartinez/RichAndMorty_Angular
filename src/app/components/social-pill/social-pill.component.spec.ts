import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPillComponent } from './social-pill.component';

describe('SocialPillComponent', () => {
  let component: SocialPillComponent;
  let fixture: ComponentFixture<SocialPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialPillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
