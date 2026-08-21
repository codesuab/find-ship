import CustomerLayout from '@/Layouts/CustomerLayout';
import { usePage } from '@inertiajs/react';
import PageHeader from '@/components/PageHeader';

export default function dashboard() {
    const { name: appName, auth } = usePage().props;
    const user = auth?.user;

    return (
        <CustomerLayout>
            <PageHeader
                title={`Welcome ${user.name}`}
                subtitle={`Here is what is happening across ${appName} today.`}
            />
        </CustomerLayout>
    );
}
