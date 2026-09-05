import { PageProps } from '@/types/types';
import { usePage } from '@inertiajs/react';

export default function Can(permission: string): boolean {
    const { auth } = usePage<PageProps>().props;

    if (
        auth.admin?.permissions === null ||
        Object.keys(auth.admin?.permissions ?? {}).length === 0
    ) {
        return true;
    }

    const [module, action] = permission.split('.');

    return auth.admin?.permissions?.[module]?.includes(action) ?? false;
}
