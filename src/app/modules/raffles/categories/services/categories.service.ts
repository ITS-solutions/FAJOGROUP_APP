import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CategoryResponse } from '../types/categories.types';
import { environment } from 'environment/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private readonly apiUrl = `${environment.API_URL}/raffles/categories`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<CategoryResponse> {
        return this.http.get<CategoryResponse>(this.apiUrl);
    }

    getById(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${id}`);
    }

    create(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiUrl, category);
    }

    update(id: number, category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
