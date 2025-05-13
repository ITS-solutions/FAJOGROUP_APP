import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';

export const permissionsGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const permissionsService = inject(PermissionsService);
    const router = inject(Router);

    const permissions = permissionsService.getPermissionsSync();

    const routeId = route.data?.['id'];

    const routePermissions =
        permissions?.data?.permissions.administrative?.[routeId]?.show?.assigned ||
        permissions?.data?.permissions.administrative?.parameters?.[routeId]?.show?.assigned;

    if (
        !routeId ||
        !routePermissions
    ) {
        console.warn(`Acceso denegado a ${routeId}`);
        router.navigate(['/example']);
        return false;
    }

    // Permite el acceso
    return true;
};

