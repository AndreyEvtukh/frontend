import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthClass } from "../auth.class";
import VerifyDialogComponent from "./verify-dialog";
import { ROUTE_PATH } from "../../models/app.model";

@Component({
    selector: 'app-verify-route',
    standalone: true,
    template: '',
})
export default class VerifyRouteComponent extends AuthClass implements OnInit, OnDestroy {
    protected component: typeof VerifyDialogComponent = VerifyDialogComponent;
    protected email: string | undefined;
    protected username: string | undefined;
    protected password_hash: string | undefined;

    constructor() {
        super();

        const navigation = this.router.currentNavigation();
        this.email = navigation?.extras?.state?.["email"];
        this.username = navigation?.extras?.state?.["username"];
        this.password_hash = navigation?.extras?.state?.["password_hash"];

        if (!this.email) {
            // void this.router.navigate([ROUTE_PATH.REGISTER]);
            // return;
        }
    }

    override ngOnInit() {
        super.ngOnInit({
            email: this.email,
            username: this.username,
            password_hash: this.password_hash,
        });
    }
}
