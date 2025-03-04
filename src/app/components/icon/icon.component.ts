import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
type IconSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl';

@Component({
  standalone: true,
  selector: 'app-icon',
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  @Input() iconWeight: IconWeight = 'regular';
  @Input() iconName: string = 'house';
  @Input() iconSize: IconSize = 'md';
  @Input() className: string = '';
  @Input() color: string = '';

  constructor() {}
}
