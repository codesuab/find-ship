import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button';
import CustomerLayout from '@/Layouts/CustomerLayout'
import { Building2, ShieldAlert, User, Workflow } from 'lucide-react';
import { useState } from 'react'

export default function account() {
    const [active, setActive] = useState('profile');
    return (
        <CustomerLayout>
            <PageHeader title='Settings' subtitle='Manage your account and workspace preferences.' />
            <div className='mt-5 max-w-125 flex gap-5'>
                <div className='w-50'>
                    <Button
                        onClick={() => setActive('profile')}
                        variant={active == 'profile' ? 'outline' : 'secondary'}
                        size='lg'
                        className="w-full justify-start"
                    >
                        <User className="size-3.5 shrink-0" aria-hidden="true" />
                        Profile
                    </Button>
                    <Button
                        onClick={() => setActive('account')}
                        variant={active == 'account' ? 'outline' : 'secondary'}
                        size='lg'
                        className="w-full justify-start"
                    >
                        <ShieldAlert className="size-3.5 shrink-0" aria-hidden="true" />
                        Account
                    </Button>
                    <Button
                        onClick={() => setActive('account')}
                        variant={active == 'account' ? 'outline' : 'secondary'}
                        size='lg'
                        className="w-full justify-start"
                    >
                        <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
                        Company
                    </Button>
                    <Button
                        onClick={() => setActive('account')}
                        variant={active == 'account' ? 'outline' : 'secondary'}
                        size='lg'
                        className="w-full justify-start"
                    >
                        <Workflow className="size-3.5 shrink-0" aria-hidden="true" />
                        Connect
                    </Button>
                </div>
                <div>
                    {active =='profile' && (
                        <div>
                            
                        </div>
                    )}
                </div>
            </div>
        </CustomerLayout>
    )
}
