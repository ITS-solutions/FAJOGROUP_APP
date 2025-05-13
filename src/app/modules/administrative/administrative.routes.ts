import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { permissionsGuard } from '../guards/permissions.guard';
import { RolesComponent } from './roles/roles.component';

export default [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [permissionsGuard],
        data: { id: 'users' }
    },
    {
        path: 'roles',
        component: RolesComponent,
        canActivate: [permissionsGuard],
        data: { id: 'roles' }
    },
] as Routes;
