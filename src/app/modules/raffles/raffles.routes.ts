import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { LotteryComponent } from './lottery/lottery.component';

export default [
    {
        path: 'categories',
        component: CategoriesComponent,
        data: { id: 'categories' }
    },
    {
        path: 'lottery',
        component: LotteryComponent,
        data: { id: 'lottery' }
    },
] as Routes;
