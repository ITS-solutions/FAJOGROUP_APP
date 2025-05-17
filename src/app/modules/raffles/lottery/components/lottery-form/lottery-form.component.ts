import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lottery } from '../../types/lottery.types';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-lottery-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './lottery-form.component.html',
    styleUrl: './lottery-form.component.scss'
})
export class LotteryFormComponent {
    @Input() initialData?: Lottery;
    @Output() formSubmit = new EventEmitter<FormData>();

    form: FormGroup;
    imagePreview: string | ArrayBuffer | null = null;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            image_file: [null]
        });
    }

    ngOnInit() {
        if (this.initialData) {
            this.form.patchValue({ name: this.initialData.name });
            if (this.initialData.imageUrl) {
                this.imagePreview = this.initialData.imageUrl;
            }
        }
    }

    onFileChange(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.form.patchValue({ image_file: file });

            // Mostrar vista previa
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    submit() {
        const formData = new FormData();
        formData.append('name', this.form.value.name);
        if (this.form.value.image_file) {
            formData.append('image_file', this.form.value.image_file);
        }
        this.formSubmit.emit(formData);
    }
}
