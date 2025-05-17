import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { Category } from './types/categories.types';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { AddRemoveComponent } from './components/add-remove/add-remove.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MODAL_CONFIG } from 'app/shared/config/modal-config';

@Component({
    selector: 'app-categories',
    standalone: true,
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss',
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        MatDialogModule,
    ],
})
export class CategoriesComponent implements OnInit {
    categories: Category[] = [];
    loading = false;
    displayedColumns: string[] = ['id', 'name', 'description', 'icon', 'status', 'created_at', 'updated_at', 'actions'];
    selectedCategory?: Category;
    showForm = false;

    constructor(
        private categoriesService: CategoriesService,
        private dialog: MatDialog
    ) { }

    openAddCategoryModal() {
        const dialogRef = this.dialog.open(AddRemoveComponent, {
            ...MODAL_CONFIG,
            data: null // Para crear, no envías datos
        });

        dialogRef.componentInstance.save.subscribe(() => {
            dialogRef.close();
            this.fetchCategories();
        });
        dialogRef.componentInstance.cancel.subscribe(() => dialogRef.close());
    }

    editCategory(category: Category) {
        const dialogRef = this.dialog.open(AddRemoveComponent, {
            ...MODAL_CONFIG,
            data: category
        });

        dialogRef.componentInstance.save.subscribe(() => {
            dialogRef.close();
            this.fetchCategories();
        });
        dialogRef.componentInstance.cancel.subscribe(() => dialogRef.close());
    }

    closeForm() {
        this.showForm = false;
        this.selectedCategory = undefined;
        this.fetchCategories();
    }

    confirmDelete(id: number) {
        // Aquí puedes abrir un diálogo de confirmación antes de eliminar
        this.categoriesService.delete(id).subscribe(() => this.fetchCategories());
    }

    ngOnInit(): void {
        this.fetchCategories();
    }

    fetchCategories(): void {
        this.loading = true;
        this.categoriesService.getAll().subscribe({
            next: (res) => {
                this.categories = res.data.data;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }
}
