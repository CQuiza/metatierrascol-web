import { Component } from '@angular/core';
import { AppVersionComponent } from '../app-version/app-version.component';

@Component({
  selector: 'app-manage-app-versions',
  standalone: true,
  imports: [AppVersionComponent],
  templateUrl: './manage-app-versions.component.html',
  styleUrl: './manage-app-versions.component.scss'
})
export class ManageAppVersionsComponent {

}
