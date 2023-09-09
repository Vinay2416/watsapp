import { Message } from './message-model.model';

export interface Group {
    id: string;
    name: string;
    chat: Message[];
    creationDate: Date;
}
