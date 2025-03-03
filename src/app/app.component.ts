import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@componentsUI/navbar/navbar.component';
import '@phosphor-icons/web/thin';
import '@phosphor-icons/web/light';
import '@phosphor-icons/web/regular';
import '@phosphor-icons/web/bold';
import '@phosphor-icons/web/fill';
import '@phosphor-icons/web/duotone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-example';
}
