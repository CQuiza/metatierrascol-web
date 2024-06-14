import { Injectable } from '@angular/core';
import {Message} from '../models/message';
 
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messagesServiceOpened=false;
  messages: Message[] = [];
  add(message: Message) {
    var id = this.messages.length + 1;
    message.id=id;
    this.messages.unshift(message);
  }
  clear() {
    this.messages = [];
  }
}
