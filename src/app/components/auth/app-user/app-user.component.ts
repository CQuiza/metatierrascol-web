import { Component, OnDestroy } from '@angular/core';

import {FormControl} from '@angular/forms';
import {FormGroup, Validators} from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { Subscription } from 'rxjs';

import { ComponentMessageComponent } from '../../messages/component-message/component-message.component';

import { GlobalMessageService } from '../../../services/global-message.service';
import { AuthService } from '../../../services/auth.service';

import { manageServerErrors, sendMessages } from '../../../utilities/manageMessages';

import { Message } from '../../../models/message';
import { StateEnum } from '../../../enumerations/stateEnum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';



@Component({
  selector: 'app-app-user',
  standalone: true,
  imports: [ComponentMessageComponent, CommonModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule
  ],
  templateUrl: './app-user.component.html',
  styleUrl: './app-user.component.scss'
})
export class AppUserComponent {
  username = new FormControl('', [Validators.required,Validators.email]);
  passwordFormControl1 = new FormControl('', [Validators.required,Validators.minLength(9)]);
  passwordFormControl2 = new FormControl('', [Validators.required,Validators.minLength(9)]);
  checkAcceptDataPolicy = new FormControl('', [Validators.required]);
  checkAcceptEmailNotifications = new FormControl('', [Validators.required]);
  
  controlsGroup = new FormGroup({
    username: this.username,
    password: this.passwordFormControl1,
    passwordFormControl2: this.passwordFormControl2,
    checkAcceptDataPolicy: this.checkAcceptDataPolicy,
    checkAcceptEmailNotifications: this.checkAcceptEmailNotifications
  })

  componentMessages:Message[] = [];

  constructor(private dataService:DataService, private globalMessageService: GlobalMessageService,
    private matSnackBar:MatSnackBar
  ){
    this.username.setValue('aaa@aaa.com');
    this.passwordFormControl1.setValue('micarro222')
    this.passwordFormControl2.setValue('micarro222')
    this.checkAcceptDataPolicy.setValue('checked');
    this.checkAcceptEmailNotifications.setValue('checked');
  }
  addUser(){
    this.componentMessages=[];
    if (this.passwordFormControl1.value != this.passwordFormControl2.value){
      this.componentMessages= sendMessages(StateEnum.error,'Las contraseñas no son iguales',this.globalMessageService,this.matSnackBar);
      return;
    }
    this.dataService.post('core/app_user/',this.controlsGroup.value).subscribe({
      next: response => {
        console.log('response',response)
        if ('id' in response){
          console.log('dd')
          var m:Message[]=sendMessages(StateEnum.success,'Su usuario ha sido añadido con éxito',this.globalMessageService, this.matSnackBar);
          var m1:Message[]=sendMessages(StateEnum.success,'Debe esperar a que un administrador lo admita',this.globalMessageService, this.matSnackBar);
          var m2:Message[]=sendMessages(StateEnum.success,'Recibirá un correo de aviso',this.globalMessageService, this.matSnackBar);
          m[0].id=1;m1[0].id=2;m2[0].id=3;
          this.componentMessages=[m[0],m1[0],m2[0]]
        }        
      },
      error:error=>{
        console.log('error',error.error)
        this.componentMessages=manageServerErrors(error,this.globalMessageService,this.matSnackBar)
      }
    });
  }

}
