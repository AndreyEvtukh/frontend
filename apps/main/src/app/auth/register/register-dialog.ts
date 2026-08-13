import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ICONS, ROUTE_PATH } from "../../models/app.model";
import { MatDialogActions, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import {
    AbstractControl,
    FormControl,
    FormGroup, FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { Router } from "@angular/router";
import { MatchPasswordDirective } from "../../directives/match-password.directive";
import { Apollo } from "apollo-angular";
import { Register } from "../../graphql/register-operations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgClass } from "@angular/common";
import { AUTH } from "../../models/constatnts";

@Component({
    selector: 'app-register',
    imports: [
        MatIcon,
        MatDialogActions, MatLabel, MatFormField,
        MatInputModule, MatFormFieldModule, ReactiveFormsModule,
        FormsModule, MatchPasswordDirective, MatProgressSpinnerModule,
        NgClass],
    templateUrl: `register-dialog.html`,
    styleUrl: 'register-dialog.css',
    animations: [AUTH.STATUS_ANIMATION],
})
export default class RegisterDialogComponent {
    private readonly apollo = inject(Apollo);

    protected showPassword = false;
    protected showConfirmPassword = false;
    protected FORM_FIELD = {
        USERNAME: "userName",
        EMAIL: "email",
        PASSWORD: "password",
        CONFIRM_PASSWORD: "confirmPassword",
    } as const;

    private router = inject(Router);
    private dialogRef = inject(MatDialogRef<RegisterDialogComponent>);

    private emailRegExp = new RegExp("^[\\w-]+(\\.[\\w-]+)*@([a-z0-9-]+(\\.[a-z0-9-]+)*?\\.[a-z]{2,6}|(\\d{1,3}\\.){3}\\d{1,3})(:\\d{4})?$");
    private passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{8,}$/;
    private noWhitespace: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;
        if ((value != null && !value.trim().length) || /\s/.test(value)) {
            return { whitespace: true };
        }
        return null;
    };
    protected form: FormGroup = new FormGroup({
        [this.FORM_FIELD.USERNAME]: new FormControl("", [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100),
        ]),
        [this.FORM_FIELD.PASSWORD]: new FormControl("", [
            Validators.required,
            Validators.minLength(1),
            this.noWhitespace,
        ]),
        [this.FORM_FIELD.CONFIRM_PASSWORD]: new FormControl("", [
            Validators.required,
            Validators.minLength(1),
            this.noWhitespace,
        ]),
        [this.FORM_FIELD.EMAIL]: new FormControl("", [
            Validators.pattern(this.emailRegExp),
            Validators.nullValidator,
            Validators.required,
            Validators.email,
        ])
    });

    protected waiting: WritableSignal<boolean> = signal<boolean>(false);
    protected response: WritableSignal<any> = signal<any>({});
    protected responseMsg: WritableSignal<boolean> = signal<boolean>(false);
    protected formSignal = signal({
        [this.FORM_FIELD.USERNAME]: '',
        [this.FORM_FIELD.EMAIL]: '',
        [this.FORM_FIELD.PASSWORD]: '',
        [this.FORM_FIELD.CONFIRM_PASSWORD]: ''
    });

    protected isFormEmpty: Signal<boolean> = computed(() => {
        const f = this.formSignal();
        return Object.keys(f).some(key => !key.trim().length);
    });

    protected emailIsInvalid: Signal<boolean> = computed(() => {
        const { errors } = this.form.controls["email"];
        return errors?.["email"] || errors?.["pattern"];
    });

    protected goLogin = async (): Promise<void> => {
        await this.router.navigate([ROUTE_PATH.LOGIN]);
        if (this.dialogRef) this.dialogRef.close('switch');
    }

    protected goVerify = async (): Promise<void> => {
        const email = this.form.controls[this.FORM_FIELD.EMAIL].value.trim();
        const username = this.form.controls[this.FORM_FIELD.USERNAME].value.trim();
        const password_hash = this.form.controls[this.FORM_FIELD.PASSWORD].value.trim();

        const success = await this.router.navigate(
            [ROUTE_PATH.VERIFY],
            {
                state: {
                    email,
                    username,
                    password_hash
                }
            }
        );

        if (success) {
            queueMicrotask(() => this.dialogRef.close('switch'));
        }
    }

    protected register = () => {
        const input = {
            email: this.form.controls[this.FORM_FIELD.EMAIL].value,
            username: this.form.controls[this.FORM_FIELD.USERNAME].value,
            password_hash: this.form.controls[this.FORM_FIELD.PASSWORD].value
        }

        this.waiting.set(true)
        this.responseMsg.set(false);
        this.apollo.mutate(
            Register.requestRegistration(input)
        ).subscribe({
            next: (data) => {
                this.waiting.set(false);
                this.goVerify();
            },
            error: ({ message }) => {
                this.responseMsg.set(true);
                this.response.set({
                    ok: false,
                    message
                })
                this.waiting.set(false);
            }
        });
    }

    protected close = () => this.dialogRef.close();

    protected doBlurredInput(input: string) {
        this.form.controls[input].markAsTouched();
        this.form.controls[input].markAsDirty();
    }

    protected dismissResponseMsg() {
        this.responseMsg.set(false);
    }

    protected readonly ICONS = ICONS;
}
