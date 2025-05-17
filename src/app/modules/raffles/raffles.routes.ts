import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

export default [
    {
        path: 'categories',
        component: CategoriesComponent,
        data: { id: 'categories' }
    },
] as Routes;
