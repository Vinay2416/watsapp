import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
    @Output() userResonse: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
    cancelAddChat() {
        this.userResonse.emit(false);
        this.dialogRef.close();
    }

    deleteChat() {
        this.userResonse.emit(true);
        this.dialogRef.close();
    }
}
