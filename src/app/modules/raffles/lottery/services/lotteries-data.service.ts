import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lottery, LotteryGetAllResponse } from '../types/lottery.types';
import { environment } from 'environment/environment';

@Injectable({ providedIn: 'root' })
export class LotteriesDataService {
    private readonly apiUrl = `${environment.API_URL}/raffles/lotteries`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<LotteryGetAllResponse> {
        return this.http.get<LotteryGetAllResponse>(this.apiUrl);
    }

    createLottery(data: FormData): Observable<Lottery> {
        return this.http.post<Lottery>(this.apiUrl, data);
    }

    updateLottery(id: number, data: FormData): Observable<Lottery> {
        data.append('_method', 'PUT');
        return this.http.post<Lottery>(`${this.apiUrl}/${id}`, data);
    }

    getLottery(id: number): Observable<Lottery> {
        return this.http.get<Lottery>(`${this.apiUrl}/${id}`);
    }
}
