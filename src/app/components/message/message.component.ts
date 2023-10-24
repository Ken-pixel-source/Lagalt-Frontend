import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messageService';
import { Message, MessageCreate } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { UserService } from 'src/app/services/userService';
import { User} from 'src/app/models/user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  user: User | undefined;
  currentlyDisplayedMessageId: any | null = null;
  usernames: { [key: string]: string } = {};

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private userService: UserService,
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
    this.messageService.getMessages(id).subscribe(messages => {
      this.messages = messages;

      // Create a set of unique creatorIds from the messages
      const uniqueCreatorIds = new Set(messages.map(message => message.creatorId));

      // For each unique creatorId, fetch the user details
      uniqueCreatorIds.forEach(creatorId => {
        this.userService.getUserDataById<User>(creatorId).subscribe(user => {
          this.usernames[creatorId] = user.userName;
        });
      });

    }, error => {
      console.error("Error fetching messages:", error);
    });
  }

  toggleReplies(messageId: any): void {
    if (this.currentlyDisplayedMessageId === messageId) {
      this.currentlyDisplayedMessageId = null; // If already displaying replies for this message, hide them
    } else {
      this.currentlyDisplayedMessageId = messageId; // Otherwise, display replies for this message
    }
  }
}
