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
        title: 'Administrative',
        type: 'collapsable',
        icon: 'heroicons_outline:chart-pie',
        children: [
            {
                id: 'administrative.users',
                title: 'Users',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/administrative/users',
            },
            {
                id: 'administrative.roles',
                title: 'Roles',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/roles'
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
