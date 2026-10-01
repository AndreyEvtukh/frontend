import { Icon } from '@/config/icon';
import { ReactNode } from 'react';

export namespace Button {
    export const NAME = {
        HOME: 'home',
        ANGULAR: 'angular',
        JAVA: 'java',
        TS: 'ts',
    } as const;

    export type Name = typeof NAME[keyof typeof NAME];

    export const registry = {
        [NAME.HOME]: 'icons/home.svg',
        [NAME.ANGULAR]: 'icons/angular.svg',
        [NAME.JAVA]: 'icons/java.svg',
        [NAME.TS]: 'icons/ts.svg',
    } as const;

    export interface Props {
        className?: string;
        children?: ReactNode;
        icon?: Icon.Name;
        isDisabled?: boolean;
        roundedClass?: string;
        onClick?: () => void;
    }
}