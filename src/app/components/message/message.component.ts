import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messageService';
import { Message, MessageCreate } from 'src/app/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
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

  addMessage() {
    this.messageService.createMessage(this.newMessage).subscribe(data => {
      this.messages.push(data);
      // Reset the form (clear input)
      this.newMessage = {
        subject: '',
        messageContent: '',
        imageUrl: '',
      };
    });
  }
}
