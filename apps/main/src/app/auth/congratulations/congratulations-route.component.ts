import { Component, OnDestroy, OnInit } from '@angular/core';
import CongratulationsDialogComponent from "./congratulations-dialog";
import { AuthClass } from "../auth.class";

@Component({
    selector: 'app-congratulations-route',
    standalone: true,
    template: '',
})
export default class CongratulationsRouteComponent extends AuthClass implements OnInit, OnDestroy {
    protected component: typeof CongratulationsDialogComponent = CongratulationsDialogComponent;
}
