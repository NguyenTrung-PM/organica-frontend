import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
    msgs: Message[] = [];
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.messageService.getMessageSubject.subscribe((data) => {
            this.msgs = data;
            setTimeout(() => (this.msgs = []), 1500);
        });
    }
}
