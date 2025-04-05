import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment/environment';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {
    private _httpClient = inject(HttpClient);
    private _permissions$ = new BehaviorSubject<any | null>(null);

    /**
     * Getter de permisos como Observable
     */
    get permissions$() {
        return this._permissions$.asObservable();
    }

    /**
     * Carga permisos y los almacena en el BehaviorSubject
     */
    async loadPermissions(token: string, id): Promise<void> {
        try {
            // Configura los encabezados con el token
            const headers = { Authorization: `Bearer ${token}` };

            // Realiza la solicitud HTTP con los encabezados
            const response = await firstValueFrom(
                this._httpClient.get(`${environment.API_URL}/administrative/roles/${id}`, { headers })
            );

            // Guarda los permisos en el BehaviorSubject
            this._permissions$.next(response);
        } catch (error) {

            // Opcional: Manejo adicional del error
            this._permissions$.next(null); // Limpia los permisos en caso de error
        }
    }

    /**
     * Obtiene los permisos de forma sincrónica
     */
    getPermissionsSync(): any {
        return this._permissions$.value; // Devuelve los permisos almacenados en el BehaviorSubject
    }

    /**
     * Borra los permisos al cerrar sesión
     */
    clearPermissions(): void {
        this._permissions$.next(null);
    }
}
