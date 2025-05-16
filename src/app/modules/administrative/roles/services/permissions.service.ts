import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {
    private readonly apiUrl = `${environment.API_URL}/administrative/permissions`;

    constructor(private http: HttpClient) { }

    /**
     * Obtener el árbol de permisos
     */
    /**
     * Obtener el árbol de permisos
     */
    getPermissionsTree(): Promise<any> {
        return firstValueFrom(
            this.http.get<{ status: string; message: any; data: any }>(`${this.apiUrl}/tree`)
                .pipe(map(response => response.data))
        );
    }
}
