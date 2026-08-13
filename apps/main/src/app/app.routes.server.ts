import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: '',
        renderMode: RenderMode.Prerender, // или Server / Client — в зависимости от вашей стратегии
    },
    {
        path: '**',
        renderMode: RenderMode.Server,
    },
];
