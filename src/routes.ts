import { ReactElement } from 'react';

interface route {
    path: string;
    name: string;
    component: ReactElement;
}

export const routes: route[] = [];