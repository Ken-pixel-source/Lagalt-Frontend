import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messageService';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  newMessage: Message = {
    messageId: 0,
    subject: '',
    parentId: 0,
    parent: null,
    messageContent: '',
    imageUrl: null,
    timestamp: new Date().toISOString(),
    userId: '', 
    user: null,
    projectId: null,
    project: null,
    replies: null
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

  addMessage(): void {
    this.messageService.createMessage(this.newMessage).subscribe(data => {
      // You might want to push the newly created message to your messages array here
      this.messages.push(data);
      // Reset the form (clear input)
      this.newMessage = {
        messageId: 0,
        subject: '',
        parentId: 0,
        parent: null,
        messageContent: '',
        imageUrl: null,
        timestamp: new Date().toISOString(),
        userId: '',  // update accordingly if you want a different default
        user: null,
        projectId: null,
        project: null,
        replies: null
      };
    });
  }
}
