import { Component, inject } from '@angular/core';
import { ICONS, ROUTE_PATH } from "../../models/app.model";
import { MatDialogActions, MatDialogRef } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-congratulations',
    imports: [
        MatIcon,
        MatDialogActions],
    templateUrl: `congratulations-dialog.html`,
    styleUrl: 'congratulations-dialog.css',
    animations: [
        trigger('okAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.5)' }),
                animate('200ms ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
            ]),
        ]),
    ],
})
export default class CongratulationsDialogComponent {
    private readonly apollo = inject(Apollo);

    private router = inject(Router);
    private dialogRef = inject(MatDialogRef<CongratulationsDialogComponent>);

    protected goMain = async (): Promise<void> => {
        await this.router.navigate([ROUTE_PATH.HOME]);
        if (this.dialogRef) this.dialogRef.close();
    }

    protected readonly ICONS = ICONS;
}
