import React from 'react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { usePage } from '@inertiajs/react'
import PageHeader from '@/components/PageHeader'

export default function dashboard() {
    const { name: appName } = usePage().props
    return (
        <CustomerLayout>
            <PageHeader title='Dashboard' subtitle={`Here is what is happening across ${appName} today.`} />
        </CustomerLayout>
    )
}
