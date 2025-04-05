import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-comfirm-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, NgIf],
    templateUrl: './comfirm-dialog.component.html',
    styleUrl: './comfirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) { }
}
