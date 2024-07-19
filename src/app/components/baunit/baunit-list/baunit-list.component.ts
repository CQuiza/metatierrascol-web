import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-baunit-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './baunit-list.component.html',
  styleUrl: './baunit-list.component.scss'
})
export class BaunitListComponent {

}
