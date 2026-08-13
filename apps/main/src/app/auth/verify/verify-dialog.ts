import {
    AfterViewInit,
    Component, computed,
    ElementRef,
    inject, OnDestroy, PLATFORM_ID,
    signal,
    viewChild,
    WritableSignal
} from '@angular/core';
import { ICONS, ROUTE_PATH, UIButton } from "../../models/app.model";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import {
    FormControl,
    FormsModule, ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { isPlatformBrowser, NgClass, NgStyle } from "@angular/common";
import { animate, style, transition, trigger } from "@angular/animations";
import { UIButtonComponent } from "../../components/ui/button/button";
import { Register } from "../../graphql/register-operations";
import { SecondsToTimePipe } from "../../pipes/seconds-to-time.pipe";

@Component({
    selector: 'app-verify',
    imports: [
        MatIcon,
        MatDialogActions,
        MatInputModule, MatFormFieldModule, ReactiveFormsModule,
        FormsModule, MatProgressSpinnerModule,
        NgClass, UIButtonComponent, SecondsToTimePipe],
    templateUrl: `verify-dialog.html`,
    styleUrl: 'verify-dialog.css',
    animations: [
        trigger('spinerAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.95)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
            ]),
        ]),
    ],
})
export default class VerifyDialogComponent implements AfterViewInit, OnDestroy {
    private data = inject(MAT_DIALOG_DATA);
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    protected email: string = this.data?.email;
    private username: string = this.data?.username;
    private password_hash: string = this.data?.password_hash;

    private readonly apollo = inject(Apollo);
    private dialogRef = inject(MatDialogRef<VerifyDialogComponent>);
    private router = inject(Router);

    protected waiting: WritableSignal<boolean> = signal<boolean>(false);
    protected activeCell: WritableSignal<number> = signal<number>(0);
    protected focussed: WritableSignal<boolean> = signal<boolean>(false);

    private readonly TIMER_DURATION = 15*60;
    protected counter: WritableSignal<number> = signal<number>(this.TIMER_DURATION);

    protected otpInputRef = viewChild<ElementRef<HTMLInputElement>>('otpInput');
    protected otpInput = signal<HTMLInputElement | null>(null);

    protected cellValues = signal<string[]>(Array(6).fill(''));
    protected inputFormControl = new FormControl("");

    protected _value: WritableSignal<string> = signal<string>("");
    protected fullCode = computed(() => !this.cellValues().some(char => !char));

    private timerId: ReturnType<typeof setInterval> | null = null;

    protected readonly ResendCodeButtonConfig: UIButton = {
        label: "Resend Code",
        labelClass: "text-bronze",
        type: 'link',
        action: this.resendCode.bind(this)
    }

    public get value() {
        return this._value();
    }

    public set value(val: string) {
        this._value.set(val);
        this.inputFormControl.setValue(val);

        const el = this.otpInput();
        if (el) el.value = val;
    }

    private startTimer(): void {
        if (!this.isBrowser) return;

        this.stopTimer();

        this.counter.set(this.TIMER_DURATION);

        this.timerId = setInterval(() => {
            this.counter.update(value => {
                if (value <= 1) {
                    this.stopTimer();
                    return 0;
                }

                return value - 1;
            });
        }, 1000);
    }

    private stopTimer(): void {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    ngAfterViewInit() {
        queueMicrotask(() => this.focusInput());
    }

    ngOnInit() {
        this.startTimer();
        this.inputFormControl.valueChanges.subscribe((value): void => {
            if (!value) return;

            if (value.length > 6) {
                this.value = value.substring(0, 6);
                return;
            }
            if (value.match(/\D/)) {
                this.value = "";
                this.activeCell.set(0);
                return;
            }

            this.cellValues.set(this.cellValues().map((c, i) => this.value.charAt(i)));
        });
    }

    protected focusInput(): void {
        const input = this.otpInputRef()?.nativeElement;
        if (!input) return;
        input.focus();
    }

    protected goRegister = async (): Promise<void> => {
        await this.router.navigate([ROUTE_PATH.REGISTER]);
        if (this.dialogRef) this.dialogRef.close('switch');
    }

    onInput(event: Event) {
        event.preventDefault();

        const input = event.target as HTMLInputElement;
        const value = input.value.replace(/\D/g, '').slice(0, 6);

        this.cellValues.set(Array.from({ length: 6 }, (_, index) => value[index] ?? ''));
        this.inputFormControl.setValue(value, { emitEvent: false });

        if (value.length === 6) {
            this.activeCell.set(5);
            return;
        }

        this.activeCell.set(Math.min(value.length, 5));
    }

    protected onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                this.goLeft();
                return;
            case 'ArrowRight':
                event.preventDefault();
                this.goRight();
                return;
            case 'Backspace':
                event.preventDefault();
                this.onBackSpace(event);
                return;
            case 'Delete':
                event.preventDefault();
                this.onDelete(event);
                return;
            case 'Tab':
                event.preventDefault();
                this.goRight();
                return;
            default:
                break;
        }
    }

    protected onPaste(event: ClipboardEvent): void {
        event.preventDefault();

        const pastedValue = event.clipboardData
            ?.getData('text')
            .replace(/\D/g, '')
            .slice(0, 6);

        if (!pastedValue) return;

        const startIndex = this.activeCell();

        for (let i = 0; i < pastedValue.length; i++) {
            const index = startIndex + i;
            if (index >= this.cellValues().length) break;
            this.cellValues()[index] = pastedValue[i];
        }

        const lastIndex = Math.min(startIndex + pastedValue.length, 6);
        this.activeCell.set(Math.min(lastIndex, 5));
        this.focusInput();
        if (this.cellValues().every(Boolean)) this.activeCell.set(5);
        this.syncInput()
    }

    continue() {
        const input = {
            email: this.email,
            code: this.inputFormControl.value as string
        }

        this.waiting.set(true)
        this.apollo.mutate(
            Register.confirmRegistration(input)
        ).subscribe({
            next: () => {
                this.waiting.set(false);
            },
            error: (err) => {
                this.waiting.set(false);
            }
        });
    }

    private syncInput(): void {
        const value = this.cellValues().join('');
        this.inputFormControl.setValue(value, { emitEvent: false });
        const input = this.otpInputRef()?.nativeElement;
        if (input) input.value = value;
        this.cellValues.set([...this.cellValues()])
    }

    cellClicked(index: number) {
        this.activeCell.set(index);
        this.focusInput();
    }

    onBackSpace($event: Event) {
        ($event as KeyboardEvent).preventDefault();
        const index = this.activeCell();

        if (this.cellValues()[index]) {
            this.cellValues()[index] = '';
            this.syncInput();
            return;
        }

        if (index > 0) {
            const previousIndex = index - 1;
            this.cellValues()[previousIndex] = '';
            this.activeCell.set(previousIndex);
            this.syncInput();
        }
    }

    protected onDelete($event: Event) {
        ($event as KeyboardEvent).preventDefault();
        const index = this.activeCell();
        this.cellValues()[index] = '';
        this.syncInput();
    }

    protected resendCode() {
        const input = {
            email: this.email,
            username: this.username,
            password_hash: this.password_hash
        }

        this.waiting.set(true)
        this.apollo.mutate(
            Register.requestRegistration(input)
        ).subscribe({
            next: () => {
                this.waiting.set(false);
                this.startTimer();
            },
            error: (err) => {
                this.waiting.set(false)
            }
        });
    };

    protected goLeft = () => this.activeCell.update((val: number): number => val - 1);
    protected goRight = () => this.activeCell.update((val: number): number => val + 1);
    protected close = () => this.dialogRef.close();

    ngOnDestroy(): void {
        this.stopTimer();
    }

    protected readonly ICONS = ICONS;
}
