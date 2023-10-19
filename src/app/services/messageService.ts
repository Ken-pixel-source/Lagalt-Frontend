import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { environment } from '../enviroment/enviroments';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageUrl = environment.projectUrl;

  constructor(private readonly httpClient: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.messageUrl);
  }

  getMessageById(id: number): Observable<Message | undefined> {
    const url = `${this.messageUrl}/${id}`;
    return this.httpClient.get<Message>(url);
  }

  createMessage(message: Message): Observable<any> {
    //const url = `${this.messageUrl}/${message}`;
    return this.httpClient.post(this.messageUrl, message);
  }
}
