import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LotteriesDataService } from './services/lotteries-data.service';
import { Lottery } from './types/lottery.types';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LotteryUpsertComponent } from './components/lottery-upsert/lottery-upsert.component';

@Component({
    selector: 'app-lottery',
    standalone: true,
    templateUrl: './lottery.component.html',
    styleUrl: './lottery.component.scss',
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        MatPaginatorModule,
        MatDialogModule,
        LotteryUpsertComponent
    ],
})
export class LotteryComponent implements OnInit {
    lotteries: Lottery[] = [];
    loading = false;
    displayedColumns: string[] = ['id', 'name', 'image', 'actions'];
    total = 0;
    pageSize = 10;
    pageIndex = 0;

    constructor(
        private lotteriesService: LotteriesDataService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.fetchLotteries();
    }

    fetchLotteries(page: number = 1): void {
        this.loading = true;
        this.lotteriesService.getAll().subscribe({
            next: (res) => {
                this.lotteries = res.data.data;
                this.total = res.data.total;
                this.pageSize = res.data.per_page;
                this.pageIndex = res.data.current_page - 1;
                this.loading = false;
            },
            error: () => (this.loading = false),
        });
    }

    onPageChange(event: PageEvent) {
        this.fetchLotteries(event.pageIndex + 1);
    }

    editLottery(lottery: Lottery | null) {
        const dialogRef = this.dialog.open(LotteryUpsertComponent, {
            width: '400px',
            data: lottery
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.fetchLotteries();
            }
        });
    }

    confirmDelete(id: number) {
        // Lógica para eliminar (puedes abrir un diálogo de confirmación)
        // this.lotteriesService.delete(id).subscribe(() => this.fetchLotteries());
    }
}
