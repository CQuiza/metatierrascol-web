import { Component, OnInit, Input } from '@angular/core';
import { ComponentMessageComponent } from '../../messages/component-message/component-message.component';
import { GlobalMessageService } from '../../../services/global-message.service';
import { manageServerErrors, sendMessages } from '../../../utilities/manageMessages';

import { Message } from '../../../models/message';
import { StateEnum } from '../../../enumerations/stateEnum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MobileAppVersionModel } from '../../../models/mobileAppVersionModel';

@Component({
  selector: 'app-app-version',
  standalone: true,
  imports: [ComponentMessageComponent],
  templateUrl: './app-version.component.html',
  styleUrl: './app-version.component.scss'
})
export class AppVersionComponent implements OnInit{
  @Input() mobileAppVersionModel: MobileAppVersionModel = new MobileAppVersionModel(
    -1,-1,'No file',false,new Date('6666-01-01'),-1,'');
  componentMessages:Message[]=[];

  constructor(private dataService:DataService, 
    private globalMessageService: GlobalMessageService,
    private matSnackBar:MatSnackBar){}
  ngOnInit(): void {
    
  }
  getAppVersionNotes(){
    this.dataService.get('http://localhost:8000/mobileappversion/mobile_app_version_notes/get_version_notes/'+ this.mobileAppVersionModel.id.toString()+'/').subscribe({
      next: response => {
        console.log('response',response)     
      },
      error:error=>{
        this.componentMessages=manageServerErrors(error,this.globalMessageService,this.matSnackBar);
      }
    });
  }

}

