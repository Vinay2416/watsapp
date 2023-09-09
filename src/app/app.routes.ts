import { Routes } from '@angular/router';
import { ChatDetailsComponent, SelectUserComponent } from './chats-details';
import { PageNotFoundComponent, InvalidUserComponent } from './error-pages';
import { HomeComponent } from './layout/home-page/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'chats',
        pathMatch: 'full',
    },
    {
        path: 'chats',
        component: HomeComponent,
        title: 'Watsapp Groups',
        children: [
            {
                path: 'chat-not-found',
                component: InvalidUserComponent,
                title: 'Chat not found',
            },
            {
                path: ':id',
                component: ChatDetailsComponent,
                title: 'Group Conversation',
            },
            {
                path: '',
                component: SelectUserComponent,
                title: 'Watsapp Groups',
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'page-not-found',
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent,
        title: 'Page not found',
    },
];
