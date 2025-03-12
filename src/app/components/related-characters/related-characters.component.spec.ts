import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCharactersComponent } from './related-characters.component';

describe('RelatedCharactersComponent', () => {
  let component: RelatedCharactersComponent;
  let fixture: ComponentFixture<RelatedCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedCharactersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
