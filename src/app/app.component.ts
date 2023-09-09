import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { ChatsListComponent, ChatDetailsComponent, SelectUserComponent } from './chats-details';
import { InvalidUserComponent, PageNotFoundComponent } from './error-pages';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, ChatsListComponent, ChatDetailsComponent, SelectUserComponent, InvalidUserComponent, PageNotFoundComponent, MatDialogModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
