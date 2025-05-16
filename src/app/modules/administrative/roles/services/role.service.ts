import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment/environment';
import { Role } from '../types/Role.type';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private readonly apiUrl = `${environment.API_URL}/administrative/roles`;

    constructor(private http: HttpClient) { }

    /**
     * Obtener todos los roles
     */
    getRoles(): Promise<Role[]> {
        return firstValueFrom(
            this.http.get<{ data: { data: Role[] } }>(this.apiUrl).pipe(
                map(response => response.data.data)
            )
        );
    }

    /**
     * Crear un nuevo rol
     */
    createRole(role: Partial<Role>): Promise<Role> {
        return this.http.post<Role>(this.apiUrl, role).toPromise();
    }

    /**
     * Actualizar un rol existente
     */
    updateRole(id: number, role: Partial<Role>): Promise<Role> {
        return this.http.put<Role>(`${this.apiUrl}/${id}`, role).toPromise();
    }

    /**
     * Eliminar un rol por ID
     */
    deleteRole(id: number): Promise<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).toPromise();
    }

    /**
     * Obtener un rol por ID
     */
    getRoleById(id: number): Promise<{ name: string; permissions: any }> {
        return this.http.get<{ data: { name: string; permissions: any } }>(`${this.apiUrl}/${id}`)
            .pipe(map(response => response.data))
            .toPromise();
    }
}
