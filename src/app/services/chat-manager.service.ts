import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group } from '../models';

@Injectable({
    providedIn: 'root',
})
export class chatManager {
    private urlPathSubject: BehaviorSubject<string>;
    private usersListSubject: BehaviorSubject<Group[]>;

    constructor() {
        this.urlPathSubject = new BehaviorSubject<string>('');
        this.usersListSubject = new BehaviorSubject<Group[]>(JSON.parse(localStorage.getItem('chats') || '[]'));
    }

    getUsersList(): Observable<Group[]> {
        return this.usersListSubject.asObservable();
    }

    getUrlPath(): Observable<string> {
        return this.urlPathSubject.asObservable();
    }

    saveToLocalStorage() {
        localStorage.setItem('chats', JSON.stringify(this.usersListSubject.value));
    }

    set updateSubjectdata(chatData: Group[]) {
        this.usersListSubject.next(chatData);
        this.saveToLocalStorage();
    }

    set currentUserUrl(path: string) {
        this.urlPathSubject.next(path);
    }
}
