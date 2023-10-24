import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messageService';
import { Message, MessageCreate } from 'src/app/models/message';
import keycloak from 'src/keycloak';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  messages: Message[] = [];
  currentlyDisplayedMessageId: any | null = null;

  toggleReplies(messageId: any): void {
    if (this.currentlyDisplayedMessageId === messageId) {
      this.currentlyDisplayedMessageId = null; // If already displaying replies for this message, hide them
    } else {
      this.currentlyDisplayedMessageId = messageId; // Otherwise, display replies for this message
    }
  }

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.fetchMessages(projectId);

      this.messageService.messageUpdated$.subscribe((newMessage) => {
        this.messages.push(newMessage);
      });
    } else {
      console.error("No project ID found in route parameters.");
    }
  }
  
  fetchMessages(id: string): void {
    this.messageService.getMessages(id).subscribe(data => {
      this.messages = data;
    },
    error => { console.error("Error fetching messages:", error); }
    );
  }
}
