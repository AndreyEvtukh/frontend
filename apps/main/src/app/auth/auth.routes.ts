import { Routes } from '@angular/router';
import { ROUTE_PATH } from "../models/app.model";

export const authRoutes: Routes = [
    {
        path: ROUTE_PATH.LOGIN,
        loadComponent: () =>
            import('./login/login-route.component').then(m => m.default),
    },
    {
        path: ROUTE_PATH.REGISTER,
        loadComponent: () =>
            import('./register/register-route.component').then(m => m.default),
    },
    {
        path: ROUTE_PATH.VERIFY,
        loadComponent: () =>
            import('./verify/verify-route.component').then(m => m.default),
    },
    {
        path: ROUTE_PATH.CONGRATULATIONS,
        loadComponent: () =>
            import('./congratulations/congratulations-route.component').then(m => m.default),
    },
];
