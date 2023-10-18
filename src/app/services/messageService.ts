import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message'; // Assuming your model is located here
import { environment } from '../enviroment/enviroments';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and injectable throughout the app
})
export class MessageService {
  private messageUrl = environment.messageUrl; // Assuming you have an API endpoint for messages in your environment file

  constructor(private readonly httpClient: HttpClient) {
    
  }

  getMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.messageUrl);
  }

  getMessageById(id: number): Observable<Message | undefined> {
    const url = `${this.messageUrl}/${id}`; // Replace with the actual API endpoint
    return this.httpClient.get<Message>(url);
  }

  createMessage(message: any): Observable<any> {
    return this.httpClient.post(this.messageUrl, message);
  }
}