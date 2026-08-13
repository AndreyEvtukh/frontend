import { Component, computed, input, InputSignal } from '@angular/core';
import { UIButton } from "../../../models/app.model";
import { MatIcon } from "@angular/material/icon";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-button',
    imports: [MatIcon, NgClass],
    templateUrl: `button.html`,
    styleUrl: 'button.css',
})
export class UIButtonComponent {
    public data: InputSignal<UIButton> = input.required<UIButton>();
    public config = computed(() => {
        const data = this.data();
        return {
            ...data,
            labelClass: this.data().labelClass ?? '',
            borderClass: this.data().borderClass ?? '',
            hoverClass: this.data().hoverClass ?? '',
            bgClass: this.data().bgClass ?? 'bg-transparent',
            roundedClass: this.data().roundedClass ?? 'rounded-md',
            type: this.data().type || 'button',
            label: this.data().label ?? '',
            icon: this.data().icon ?? '',
            isDisabled: this.data().isDisabled ?? false
        }
    })

    onClick(): void {
        const action = this.config().action;
        if (typeof action === 'function') {
            action!();
        }
    }
}
