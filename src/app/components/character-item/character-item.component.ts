import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';
import { TooltipDirective } from '@coreui/angular';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { Character } from '@typesApp/interfacesRM';

@Component({
  selector: 'app-character-item',
  imports: [
    TooltipDirective,
    RouterModule,
    CommonModule,
    IconComponent,
    RouterLink,
    LoaderSpinnerComponent,
  ],
  templateUrl: './character-item.component.html',
  styleUrl: './character-item.component.css',
})
export class CharacterItemComponent {
  @Input() isLoading: boolean = false;
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() status: string = '';
  @Input() species: string = '';
  @Input() id: number | string = 0;
  @Input() character: Character = {} as Character;
  @Input() customUrl: string = '';

  onImageLoad(item: Character): void {
    item.loading = false;
  }
}
