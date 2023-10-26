import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, MessageCreate } from '../models/message';
import { environment } from '../enviroment/enviroments';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private projectUrl = environment.projectUrl;
  private messageUpdated = new Subject<Message>();
  public messageUpdated$ = this.messageUpdated.asObservable();

  constructor(private readonly httpClient: HttpClient) { }

  getMessages(id: string): Observable<Message[]> {
    const url = `${this.projectUrl}/${id}/messages`
    return this.httpClient.get<Message[]>(url);
  }

  getMessageById(id: string, messageId: number): Observable<any> {
    const url = `${this.projectUrl}/${id}/messages/${messageId}`;
    return this.httpClient.get<Message>(url);
  }

  // Create a new message
  createMessage(id: string, message: MessageCreate): Observable<any> {
    return this.httpClient.post(`${this.projectUrl}/${id}/messages`, message).pipe(
      tap((newMessage: any) => {
        this.messageUpdated.next(newMessage);
      })
    );
  }
}
