import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messageService';
import { Message, MessageCreate } from 'src/app/models/message';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchMessages();

    this.messageService.messageUpdated$.subscribe((newMessage) => {
      this.messages.push(newMessage);
    });
  }
  
  fetchMessages(): void {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data;
    },
    error => { console.error("Error fetching messages:", error); }
    );
  }
}
