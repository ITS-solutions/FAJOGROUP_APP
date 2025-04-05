import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { permissionsGuard } from '../guards/permissions.guard';

export default [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [permissionsGuard],
        data: { id: 'users' }
    },
] as Routes;
