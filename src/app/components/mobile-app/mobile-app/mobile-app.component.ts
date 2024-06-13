import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-mobile-app',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './mobile-app.component.html',
  styleUrl: './mobile-app.component.scss'
})
export class MobileAppComponent {

}
