/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
        alwaysVisible: true,
    },
    {
        id: 'administrative',
        title: 'Administrativo',
        type: 'collapsable',
        icon: 'heroicons_outline:cog-6-tooth',
        children: [
            {
                id: 'administrative.users',
                title: 'Users',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/administrative/users',
            },
            {
                id: 'administrative.roles',
                title: 'Roles',
                type: 'basic',
                icon: 'heroicons_outline:key',
                link: '/administrative/roles'
            }
        ]
    },
    {
        id: 'raffles',
        title: 'Rifas',
        type: 'collapsable',
        icon: 'heroicons_outline:ticket',
        children: [
            {
                id: 'raffles.categories',
                title: 'Raffles',
                type: 'basic',
                icon: 'heroicons_outline:gift',
                link: 'raffles/categories',
            },
            {
                id: 'raffles.lottery',
                title: 'Lottery',
                type: 'basic',
                icon: 'heroicons_outline:currency-dollar', // Icono más acorde para lotería
                link: 'raffles/lottery'
            }
        ]
    }
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
