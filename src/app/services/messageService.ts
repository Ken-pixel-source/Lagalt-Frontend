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
  private messageUrl = environment.messageUrl;
  private messageUpdated = new Subject<Message>();
  public messageUpdated$ = this.messageUpdated.asObservable();

  constructor(private readonly httpClient: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.messageUrl);
  }

  getMessageById(id: number): Observable<Message | undefined> {
    const url = `${this.messageUrl}/${id}`;
    return this.httpClient.get<Message>(url);
  }

  createMessage(message: MessageCreate): Observable<any> {
    return this.httpClient.post(`${this.messageUrl}`, message).pipe(
      tap((newMessage: any) => {
        this.messageUpdated.next(newMessage);
      })
    );
  }
}
