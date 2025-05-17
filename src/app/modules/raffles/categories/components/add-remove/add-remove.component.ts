import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../types/categories.types';
import { CategoriesService } from '../../services/categories.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { IconPickerComponent } from '../icon-picker/icon-picker.component';

@Component({
    selector: 'app-add-remove',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIcon,
        IconPickerComponent,
    ],
    templateUrl: './add-remove.component.html',
    styleUrl: './add-remove.component.scss'
})
export class AddRemoveComponent {
    @Output() save = new EventEmitter<Category>();
    @Output() cancel = new EventEmitter<void>();

    form: FormGroup;
    loading = false;
    iconPickerOpen = false;

    constructor(
        private fb: FormBuilder,
        private categoriesService: CategoriesService,
        private dialogRef: MatDialogRef<AddRemoveComponent>,
        @Inject(MAT_DIALOG_DATA) public category: Category | null
    ) {
        this.form = this.fb.group({
            name: [category?.name || '', Validators.required],
            description: [category?.description || '', Validators.required],
            status: [category?.status ?? 1, Validators.required],
            icon: [category?.icon || '', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;
        this.loading = true;
        const data = this.form.value;

        if (this.category && this.category.id) {
            // Editar
            this.categoriesService.update(this.category.id, data).subscribe({
                next: (updated) => {
                    this.loading = false;
                    this.save.emit(updated);
                    this.dialogRef.close();
                },
                error: () => this.loading = false
            });
        } else {
            // Crear
            this.categoriesService.create(data).subscribe({
                next: (created) => {
                    this.loading = false;
                    this.save.emit(created);
                    this.dialogRef.close();
                },
                error: () => this.loading = false
            });
        }
    }

    openIconPicker() {
        this.iconPickerOpen = true;
    }

    onIconSelected(icon: string) {
        this.form.get('icon')?.setValue(icon);
        this.iconPickerOpen = false;
    }

    onCancel(): void {
        this.cancel.emit();
        this.dialogRef.close();
    }
}
