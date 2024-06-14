import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { StateType } from '../../enumerations/stateType';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  constructor(private messageService:MessageService){
    this.messageService.add(new Message(StateType.success,'Prueba1'));
    this.messageService.add(new Message(StateType.info,'Prueba2'));
    this.messageService.add(new Message(StateType.error,'Prueba3'));
  }
  getMessages(){return this.messageService.messages}
}
