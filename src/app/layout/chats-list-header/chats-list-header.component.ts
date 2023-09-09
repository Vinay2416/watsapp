import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-chat-list-header',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: './chats-list-header.component.html',
    styleUrls: ['./chats-list-header.component.scss'],
})
export class UsersListHeaderComponent {}
