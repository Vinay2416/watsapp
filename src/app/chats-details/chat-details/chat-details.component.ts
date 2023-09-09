import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ChatDetailsHeaderComponent } from '../chat-details-header/chat-details-header.component';
import { chatManager } from '../../services';
import { Group, Message } from '../../models';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-user-details',
    standalone: true,
    imports: [CommonModule, ChatDetailsHeaderComponent, FormsModule, DatePipe],
    templateUrl: './chat-details.component.html',
    styleUrls: ['./chat-details.component.scss'],
})
export class ChatDetailsComponent {
    @ViewChild('scrollmsgs') scrollableDiv!: ElementRef;

    isSameUser: boolean = false;
    showImage = true;
    rotate = true;
    currentChat!: Group;
    msgs: Message[] = [];
    newMessage = '';
    chatList: Group[] = [];
    constructor(private activatedRoute: ActivatedRoute, public chatService: chatManager, private routes: Router, private location: Location, private datePipe: DatePipe, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.chatService.currentUserUrl = this.location.path();
            this.chatService.getUsersList().subscribe((chatData) => {
                this.chatList = chatData;
            });
            const findChat = this.chatList.find((chat) => chat.id === params['id']);
            if (!findChat) {
                this.routes.navigate(['chat-not-found'], { relativeTo: this.activatedRoute.parent });
            } else {
                this.currentChat = findChat;
                this.msgs = this.currentChat.chat;
            }
        });
    }

    ngAfterViewChecked(): void {
        const div = this.scrollableDiv.nativeElement;
        div.scrollTop = div.scrollHeight;
    }

    handleDelete(event: boolean) {
        if (event) {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                panelClass: 'dialog-styles',
            });

            dialogRef.componentInstance.userResonse.subscribe((res: boolean) => {
                if (res) {
                    this.chatService.updateSubjectdata = this.chatList.filter((chat) => chat.id != this.currentChat.id);
                    this.routes.navigate(['']);
                }
            });
        }
    }

    toggleImage() {
        this.showImage = !this.showImage;
    }

    sendMessage() {
        if (this.currentChat.chat.length == 0) {
            this.isSameUser = true;
        } else {
            const n = this.msgs.length;
            if (this.msgs[n - 1].isAnonymous === this.showImage) {
                this.isSameUser = false;
            } else {
                this.isSameUser = true;
            }
        }
        const newMsg: Message = { msg: this.newMessage, isAnonymous: this.showImage, date: new Date(), isSameUser: this.isSameUser };
        this.currentChat.chat.push(newMsg);
        this.chatList = this.chatList.filter((chat) => chat.id !== this.currentChat.id);
        this.chatList.unshift(this.currentChat);
        this.chatService.updateSubjectdata = this.chatList;
        this.newMessage = '';
    }

    getTime(date: Date) {
        const today = new Date();
        if (this.datePipe.transform(date, 'dd/MM/yyyy') === this.datePipe.transform(today, 'dd/MM/yyyy')) {
            return this.datePipe.transform(date, 'shortTime');
        } else {
            return this.datePipe.transform(date, 'short');
        }
    }
}
