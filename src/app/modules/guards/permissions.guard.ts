import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';

export const permissionsGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const permissionsService = inject(PermissionsService);
    const router = inject(Router);

    // Obtiene los permisos de forma sincrónica
    const permissions = permissionsService.getPermissionsSync();

    // Obtiene el ID de la ruta desde los datos
    const routeId = route.data?.['id'];

    // Verifica si el ID de la ruta es válido y si el permiso está asignado
    if (!routeId || !permissions?.data?.permissions.administrative?.[routeId]?.show?.assigned) {
        console.warn(`Acceso denegado a ${routeId}`);
        router.navigate(['/example']);
        return false;
    }

    // Permite el acceso
    return true;
};

