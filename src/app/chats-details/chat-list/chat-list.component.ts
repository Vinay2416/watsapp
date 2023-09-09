import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UsersListHeaderComponent } from '../../layout';
import { Group } from '../../models';
import { chatManager } from '../../services';
import { AddChatDialogComponent } from 'src/app/add-chat-dialog/add-chat-dialog.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [CommonModule, UsersListHeaderComponent, FormsModule, RouterOutlet, RouterLink],
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
})

export class ChatsListComponent {
    @ViewChild('dialog') chatNameDialog:ElementRef | undefined;
    selectedUserId = '';
    inputValue = '';
    chatList: Group[] = [];
    tempChatList: Group[] = [];
    chatName = '';
    // private dialogElement!: any;
    // popUp:Dialog | undefined;
    constructor(private router: Router, private chatService: chatManager, private datePipe: DatePipe, private dialog: MatDialog) {}
    ngOnInit(): void {
        const chatListJson = localStorage?.getItem('chats');
        this.chatList = chatListJson ? JSON.parse(chatListJson) : [];
        this.chatService.getUsersList().subscribe((chatData) => {
            this.chatList = chatData;
            this.tempChatList = this.chatList;
        });
        this.chatService.getUrlPath().subscribe((path) => {
            this.selectedUserId = path.split('/').pop() as string;
        });
    }

    userClicked(id: string) {
        this.selectedUserId = id;
    }
    addChat() {
        // const dialogElement = this.chatNameDialog.nativeElement;
        // if (dialogElement) {
        //   dialogElement.showModal();
        // }
        if (this.chatNameDialog) {
            this.chatNameDialog.nativeElement.showModal();
          }

        // const dialogRef = this.dialog.open(AddChatDialogComponent, {
        //     panelClass: 'dialog-styles',
        // });

        // dialogRef.componentInstance.chatAdded.subscribe((chatName: string) => {
        //     if (chatName.trim() !== '') {
        //         const newChat: Group = {
        //             id: Date.now().toString(),
        //             name: chatName,
        //             chat: [],
        //             creationDate: new Date(),
        //         };
        //         this.chatList.unshift(newChat);
        //         this.chatService.updateSubjectdata = this.chatList;
        //         this.router.navigate(['chats', newChat.id]);
        //         this.tempChatList = this.chatList;
        //         this.chatName = '';
        //     }
        // });
    }

    getLastmsg(currentGroup: any) {
        const lastMsg = currentGroup.chat[currentGroup.chat.length - 1].isAnonymous ? 'Anonymous: ' + currentGroup.chat[currentGroup.chat.length - 1].msg : 'You: ' + currentGroup.chat[currentGroup.chat.length - 1].msg;
        if (lastMsg.length > 27) {
            return lastMsg.slice(0, 27) + '...';
        } else {
            return lastMsg;
        }
    }
    getTime(date: Date) {
        const today = new Date();
        if (this.datePipe.transform(date, 'dd/MM/yyyy') === this.datePipe.transform(today, 'dd/MM/yyyy')) {
            return this.datePipe.transform(date, 'shortTime');
        } else {
            return this.datePipe.transform(date, 'dd/MM/yyyy');
        }
    }

    updateList() {
        const filteredUsers = this.chatList.filter((user) => user.name.toLowerCase().includes(this.chatName.toLowerCase().trim()));
        this.tempChatList = filteredUsers;
    }
}
