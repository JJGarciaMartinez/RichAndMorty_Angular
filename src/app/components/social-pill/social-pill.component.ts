import { Component, Input } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-social-pill',
  imports: [IconComponent],
  templateUrl: './social-pill.component.html',
  styleUrl: './social-pill.component.css',
})
export class SocialPillComponent extends IconComponent {
  @Input() socialLink: string = '';
  @Input() socialIcon: string = '';
  @Input() socialName: string = '';
  @Input() classPill: string = '';
  @Input() isTargetBlank: boolean = true;

  constructor() {
    super();
  }
}
