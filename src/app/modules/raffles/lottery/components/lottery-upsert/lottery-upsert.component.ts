import { Component, Inject } from '@angular/core';
import { Lottery } from '../../types/lottery.types';
import { LotteriesDataService } from '../../services/lotteries-data.service';
import { LotteryFormComponent } from '../lottery-form/lottery-form.component';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-lottery-upsert',
    standalone: true,
    imports: [CommonModule, LotteryFormComponent],
    templateUrl: './lottery-upsert.component.html',
    styleUrl: './lottery-upsert.component.scss'
})
export class LotteryUpsertComponent {
    lottery?: Lottery;
    isEdit = false;
    loading = false;

    constructor(
        private lotteriesService: LotteriesDataService,
        private dialogRef: MatDialogRef<LotteryUpsertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Lottery | null
    ) {
        if (data) {
            this.lottery = data;
            this.isEdit = true;
        }
    }

    onSubmit(formData: FormData) {
        if (this.isEdit && this.lottery?.id) {
            this.lotteriesService.updateLottery(this.lottery.id, formData).subscribe(() => {
                this.dialogRef.close(true);
            });
        } else {
            this.lotteriesService.createLottery(formData).subscribe(() => {
                this.dialogRef.close(true);
            });
        }
    }
}
