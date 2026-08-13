import { animate, style, transition, trigger } from "@angular/animations";

export namespace AUTH {
    export const STATUS_ANIMATION = trigger('spinerAnimation', [
        transition(':enter', [
            style({ opacity: 0, transform: 'scale(0.97)' }),
            animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
        ]),
        transition(':leave', [
            animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
        ]),
    ]);
}


