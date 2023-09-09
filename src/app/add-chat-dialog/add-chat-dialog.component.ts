import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-chat-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-chat-dialog.component.html',
})
export class AddChatDialogComponent {
    @Output() chatAdded: EventEmitter<string> = new EventEmitter<string>();
    chatName: string = '';
    
    constructor(private dialogRef: MatDialogRef<AddChatDialogComponent>) {}
    confirmAddChat() {
        if (this.chatName.trim() !== '') {
            this.chatAdded.emit(this.chatName);
            this.dialogRef.close();
        }
    }

    cancelAddChat() {
        this.dialogRef.close();
    }
}
