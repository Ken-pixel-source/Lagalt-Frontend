import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/messageService';
import { MessageCreate } from 'src/app/models/message';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {
   newMessage: MessageCreate = {
    subject: '',
    messageContent: '',
    imageUrl: ''
  };

  constructor(private messageService: MessageService) { }

  createMessage(): void {
    this.messageService.createMessage(this.newMessage).subscribe(response => {
      console.log('Message sent successfully!', response);
      // You can add other logic here e.g. clearing the form or showing a success message
    });
  }
}
