import { Injectable, inject } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { PermissionsService } from 'app/modules/services/permissions.service';
import {
    compactNavigation,
    defaultNavigation,
    futuristicNavigation,
    horizontalNavigation,
} from 'app/mock-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class NavigationMockApi {
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    private _permissionsService = inject(PermissionsService);

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    /**
     * Filtrar la navegación basada en permisos
     */
    private filterNavigation(navigation: FuseNavigationItem[]): FuseNavigationItem[] {
        const permissions = this._permissionsService.getPermissionsSync();

        function filterItems(items: FuseNavigationItem[]): FuseNavigationItem[] {
            return items
                .map((item) => {
                    // Siempre mostrar elementos con `alwaysVisible`
                    if (item.alwaysVisible) return item;

                    // Si el elemento tiene hijos, filtrar recursivamente
                    if (item.children) {
                        const filteredChildren = filterItems(item.children);
                        return filteredChildren.length > 0 ? { ...item, children: filteredChildren } : null;
                    }

                    // Extraer la clave relevante del `id`
                    const permissionKey = item.id.split('.').pop(); // Obtiene la última parte del `id` (por ejemplo, "roles" de "administrative.roles")

                    // Manejo especial para `roles`
                    if (permissionKey === 'roles') {
                        return permissions?.data?.permissions?.administrative?.parameters?.roles?.show?.assigned
                            ? item
                            : null;
                    }

                    // Verificar si el permiso está asignado para otros casos
                    return permissions?.data?.permissions?.administrative?.[permissionKey]?.show?.assigned
                        ? item
                        : null;
                })
                .filter((item) => item !== null) as FuseNavigationItem[];
        }

        return filterItems(navigation);
    }

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
            return [
                200,
                {
                    compact: cloneDeep(this.filterNavigation(this._compactNavigation)),
                    default: cloneDeep(this.filterNavigation(this._defaultNavigation)),
                    futuristic: cloneDeep(this.filterNavigation(this._futuristicNavigation)),
                    horizontal: cloneDeep(this.filterNavigation(this._horizontalNavigation)),
                },
            ];
        });
    }
}
