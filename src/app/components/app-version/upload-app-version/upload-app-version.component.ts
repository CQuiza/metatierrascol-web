import { Component, ElementRef, ViewChild} from '@angular/core';

import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

import { ComponentMessageComponent } from '../../messages/component-message/component-message.component';
import { GlobalMessageService } from '../../../services/global-message.service';
import { manageServerErrors, sendMessages } from '../../../utilities/manageMessages';

import { Message } from '../../../models/message';
import { StateEnum } from '../../../enumerations/stateEnum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-upload-app-version',
  standalone: true,
  imports: [ComponentMessageComponent, CommonModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule, MatTooltip
  ],
  templateUrl: './upload-app-version.component.html',
  styleUrl: './upload-app-version.component.scss'
})
export class UploadAppVersionComponent {
  @ViewChild('fileNameParagraph') fileNameParagraph: ElementRef = {} as ElementRef;
  filenameParagraphClass = 'red';
  file: File | null = null

  controlsGroup = new FormGroup({});
  controlNames: string[];

  componentMessages:Message[]=[];

  version = new FormControl('', [Validators.required]);


  constructor(private dataService:DataService, 
    private globalMessageService: GlobalMessageService,
    private matSnackBar:MatSnackBar
  ){
    this.controlNames=['note0']
    this.controlsGroup.addControl('note0',new FormControl('',[Validators.required]))
    this.controlsGroup.addControl('fileNameInput',new FormControl('',[Validators.required]))
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      this.fileNameParagraph.nativeElement.innerHTML=this.file?.name;
    }
  }

  getFilenameParagraphClass():String{
    var className:String;
    this.file?  className= 'blue' :  className = 'red';
    return className
  }
  addnote(){
    let controlName = 'note' + this.controlNames.length.toString()
    this.controlNames.push(controlName)
    this.controlsGroup.addControl(controlName, new FormControl('', Validators.required));
  }
  removeNote(){
    let index = this.controlNames.length-1
    let controlName = this.controlNames[index];
    this.controlNames.pop();
    console.log(index, controlName)
    this.controlsGroup.removeControl(controlName)
  }
  send(){
    console.log(this.controlsGroup.value)
    console.log(this.controlsGroup.get('note1')?.value)
  }
  getNotes(){
    return Object.entries(this.controlsGroup)
  }
  
}

