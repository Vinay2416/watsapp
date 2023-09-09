import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-chat-details-header",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./chat-details-header.component.html",
    styleUrls: ["./chat-details-header.component.scss"],
})
export class ChatDetailsHeaderComponent {
    @Input() chatName: string | undefined;
    @Output() customEvent = new EventEmitter<boolean>(false);

    notifyParent() {
        this.customEvent.emit(true);
    }
}
