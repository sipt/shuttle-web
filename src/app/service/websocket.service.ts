import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws: WebSocket;

  constructor() { }

  InitWebSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.next(event);
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }

  sendMessage(data: string) {
    this.ws.send(data);
  }

  close() {
    this.ws.close();
  }
}
