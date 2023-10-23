import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/messageService';
import { Message, MessageCreate } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute

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

  projectId: string | null = null;  // Stores the projectId

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');  // Get 'id' from route parameters

    if (this.projectId) {
      this.fetchMessages(this.projectId);  // Pass the projectId to fetchMessages
    } else {
      console.error("No project ID found in route parameters.");
    }
  }

  fetchMessages(id: string): void {
    this.messageService.getMessages(id).subscribe(data => {
      this.messages = data;
    });
  }

  createMessage(): void {
    if (this.newMessage.subject && this.newMessage.messageContent && this.projectId) {

      this.messageService.createMessage(this.projectId, this.newMessage).subscribe(response => {
        console.log('Message sent successfully!', response);

        // Clear the form
        this.newMessage.subject = '';
        this.newMessage.messageContent = '';
        this.newMessage.imageUrl = '';

        this.fetchMessages(this.projectId!);  // Refresh messages after creating a new one
      });
      
    } else {
      alert('Both subject and message content is required!')
    }
  }
}
