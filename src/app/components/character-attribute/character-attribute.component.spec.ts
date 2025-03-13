import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAttributeComponent } from './character-attribute.component';

describe('CharacterAttributeComponent', () => {
  let component: CharacterAttributeComponent;
  let fixture: ComponentFixture<CharacterAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterAttributeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
