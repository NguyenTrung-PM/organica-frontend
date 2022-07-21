import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private messageSubject = new BehaviorSubject<Message[]>([]);
    getMessageSubject = this.messageSubject.asObservable();
    constructor() {}

    addMessage(message: Message[]) {
        this.messageSubject.next(message);
    }
}
