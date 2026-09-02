import { Button } from '@/components/ui/button';
import { Field, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, Toaster } from '@/components/ui/toast';
import { PageProps } from '@/types/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

interface FormData {
    email: string | '';
    password: string | '';
}

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

    // form
    const { data, setData, post, errors, processing } = useForm<FormData>({
        email: '',
        password: '',
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.login.post'), {
            preserveScroll: true,
        });
    };
    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#c5e6ff] px-5 font-sans text-slate-900 antialiased">
            <Head>
                <title>Verify email address.</title>
            </Head>
            <Toaster />

            {/* form */}
            <div className="z-2 w-full rounded-2xl bg-white p-10 md:max-w-100">
                <h1 className="mb-2 text-center text-[20px] font-semibold tracking-tight text-foreground md:text-[25px]">
                    Admin Sign In
                </h1>
                <p className="mb-6 text-center text-sm leading-relaxed text-muted-foreground">
                    Sign in to access and manage your admin dashboard.
                </p>

                <form
                    method="post"
                    onSubmit={handleLogin}
                    className="mt-8 flex flex-col gap-4"
                >
                    <div className="space-y-3">
                        <Field>
                            <Label>Email*</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            {errors.email && (
                                <FieldDescription className="text-destructive">
                                    {errors.email}
                                </FieldDescription>
                            )}
                        </Field>
                        <Field>
                            <Label>Password*</Label>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />
                            {errors.password && (
                                <FieldDescription className="text-destructive">
                                    {errors.password}
                                </FieldDescription>
                            )}
                        </Field>
                        <Button
                            type="submit"
                            size="xl"
                            className="w-full"
                            disabled={processing}
                        >
                            Login{processing ? '..' : ''}
                        </Button>
                    </div>
                </form>

                <p className="mx-auto mt-4 max-w-[70%] text-center text-sm leading-relaxed text-muted-foreground">
                    This area is restricted to authorized administrators only.
                </p>
            </div>

            {/* bg */}
            <img
                src="/media/system/cloud.png"
                className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 md:-bottom-30"
            />
        </div>
    );
}
