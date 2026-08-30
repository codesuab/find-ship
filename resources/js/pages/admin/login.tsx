import { toast, Toaster } from '@/components/ui/toast';
import { PageProps } from '@/types/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function login() {
    const { flash } = usePage<PageProps>().props;

    // show error
    useEffect(() => {
        if (flash?.error) {
            toast.add({
                type: 'error',
                description: flash.error,
                priority: 'high',
            });
        }

        if (flash?.success) {
            toast.add({
                type: 'success',
                description: flash.success,
                priority: 'high',
            });
        }
    }, [flash?.id]);
    return (
        <div className="relative flex min-h-screen w-full bg-white font-sans text-slate-900 antialiased lg:flex-row">
            <Head>
                <title>Verify email address.</title>
            </Head>
            <Toaster />

            {/* form */}
            <div className="relative container flex w-full flex-col items-center justify-center">
                <div className="z-2">
                    <div className="w-full md:max-w-100">
                        <div className="mb-10">
                            <h1 className="mb-4 text-[30px] leading-[1.05] font-semibold tracking-tight text-foreground md:text-[35px]">
                                Verify your email
                            </h1>

                            <p className="text-[15px] text-balance text-muted-foreground">
                                We&apos;ve sent a verification link to your
                                email. Please check your inbox to verify your
                                account.
                            </p>
                        </div>

                        <form method="post" className="flex flex-col gap-4">
                            <div className="space-y-3"></div>
                        </form>
                    </div>
                </div>
            </div>

            {/* bg */}
            <div className="absolute -top-50 -left-50 z-1 hidden h-100 w-100 rounded-full bg-primary/30 blur-3xl md:block"></div>
        </div>
    );
}
