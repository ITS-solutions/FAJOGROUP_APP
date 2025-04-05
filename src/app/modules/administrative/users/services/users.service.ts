import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { User } from '../types/users.types';
import { HttpRequestMessagesService } from '../../../services/http-request-messages.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private _httpClient = inject(HttpClient);
    private readonly apiUrl = `${environment.API_URL}/administrative/users`;
    private httpRequestMessagesService = inject(HttpRequestMessagesService);

    /**
     * Obtener todos los usuarios con paginación
     */
    async getUsers(): Promise<User[]> {
        try {
            const response = await this._httpClient
                .get<{ data: User[] }>(`${this.apiUrl}`)
                .toPromise();
            return response.data['data'];
        } catch (error) {
            this.handleError(error, 'obtener');
        }
    }

    /**
     * Obtener un usuario por ID
     */
    async getUserById(id: number): Promise<User> {
        try {
            const response = await this._httpClient
                .get<{ data: User }>(`${this.apiUrl}/${id}`)
                .toPromise();
            this.httpRequestMessagesService.showMessage('ok', null, 'obtener');
            return response.data['data'];
        } catch (error) {
            this.handleError(error, 'obtener');
        }
    }

    /**
     * Crear un nuevo usuario
     */
    async createUser(user: Partial<User>): Promise<User> {
        try {
            const response = await this._httpClient
                .post<{ data: User }>(this.apiUrl, user)
                .toPromise();
            this.httpRequestMessagesService.showMessage('ok', null, 'crear');
            return response.data['data'];
        } catch (error) {
            this.handleError(error, 'crear');
        }
    }

    /**
     * Actualizar un usuario existente
     */
    async updateUser(id: number, user: Partial<User>): Promise<User> {
        try {
            const response = await this._httpClient
                .put<{ data: User }>(`${this.apiUrl}/${id}`, user)
                .toPromise();
            this.httpRequestMessagesService.showMessage('ok', null, 'editar');
            return response.data['data'];
        } catch (error) {
            this.handleError(error, 'editar');
        }
    }

    /**
     * Eliminar un usuario por ID
     */
    async deleteUser(id: number): Promise<string> {
        try {
            const response = await this._httpClient
                .delete<{ message: string }>(`${this.apiUrl}/${id}`)
                .toPromise();
            this.httpRequestMessagesService.showMessage('ok', response.message, 'eliminar');
            return response.message;
        } catch (error) {
            this.handleError(error, 'eliminar');
        }
    }

    /**
     * Manejar errores y mostrar mensajes
     */
    private handleError(error: any, operation: string): void {
        const errorMessage = error?.message || 'Error desconocido';
        this.httpRequestMessagesService.showMessage('error', errorMessage, operation);
        console.error(`Error en la operación "${operation}":`, error);
        throw error;
    }
}
