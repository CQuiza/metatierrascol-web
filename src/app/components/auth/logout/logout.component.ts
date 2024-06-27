import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormControl} from '@angular/forms';
import {FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";

import { AuthService } from '../../../services/auth.service';

import { Message } from '../../../models/message';

import { ComponentMessageComponent } from '../../messages/component-message/component-message.component';
import { sendMessages } from '../../../utilities/manageMessages';
import { StateEnum } from '../../../enumerations/stateEnum';
import { GlobalMessageService } from '../../../services/global-message.service';
import { AuthUserModel } from '../../../models/authUserModel';

import { SidenavsService } from '../../../services/sidenavs.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [ComponentMessageComponent, CommonModule,
    MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnDestroy {

  authUserModel: AuthUserModel = new AuthUserModel('',new Date('6666-01-01'),[],'',false)
  componentMessages:Message[] = [];

  authMessagesSub?: Subscription;
  authUserSub?:Subscription;

  constructor(private authService: AuthService, private router:Router, 
    private sidenavsService:SidenavsService
  ){
    this.authUserModel=authService.authUserModel;
    this.authMessagesSub=this.authService.authMessagesSubject.subscribe({
      next: componentMessages => {
        this.componentMessages = componentMessages;
      }
    })
    this.authUserSub=this.authService.authUserSubject.subscribe({
      next: authUserModel => {
        this.authUserModel=authUserModel;
      }
    });
  }
  logout(){
    this.authService.logout();
    this.sidenavsService.closeAppSidenavRight();
    this.router.navigate(['',{outlets: {right_sidenav:['blank']}}]);
  }
  ngOnDestroy(): void {
    this.authMessagesSub?.unsubscribe();
    this.authUserSub?.unsubscribe();
  }
}
