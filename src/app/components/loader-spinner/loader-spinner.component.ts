import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '@coreui/angular';

@Component({
  selector: 'app-loader-spinner',
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.css',
})
export class LoaderSpinnerComponent {
  @Input() text: string = '';
}
