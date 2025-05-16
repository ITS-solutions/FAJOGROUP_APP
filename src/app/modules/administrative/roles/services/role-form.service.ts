import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleFormService {
    private formSubject = new BehaviorSubject<FormGroup | null>(null);
    form$ = this.formSubject.asObservable();

    set form(form: FormGroup) {
        this.formSubject.next(form);
    }

    get form(): FormGroup {
        return this.formSubject.getValue()!;
    }
}
