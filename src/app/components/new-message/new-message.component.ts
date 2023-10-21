import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/messageService';
import { MessageCreate } from 'src/app/models/message';
import { Message, MessageResponse } from 'src/app/models/message';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})

export class NewMessageComponent {
  messages: Message[] = [];
   newMessage: MessageCreate = {
    subject: '',
    messageContent: '',
    imageUrl: ''
  };

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  createMessage(): void {
    if (this.newMessage.subject && this.newMessage.messageContent) {

      this.messageService.createMessage(this.newMessage).subscribe(response => {
      console.log('Message sent successfully!', response);

      // Clear the form
      this.newMessage.subject = '';
      this.newMessage.messageContent = '';
      this.newMessage.imageUrl = '';

      this.fetchMessages();
      });
      
    } else {
      alert('Both subject and message content are required!')
    }
  }
}
