import { FormEvent, useEffect, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SlideUpButton from '@/components/slideup-button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { toast, Toaster } from '@/components/ui/toast';
import { PageProps } from '@/types/types';
import Illustrator from './Illustrator';

export default function forgat() {
    const { flash } = usePage<PageProps>().props;

    // animation
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 18,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 24,
            },
        },
    };

    // form
    const { data, setData, processing, errors, post } = useForm<{
        email: string;
    }>({
        email: '',
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('ui.forgat.login'), {
            preserveScroll: true,
        });
    };

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
        <div className="flex min-h-screen w-full bg-white font-sans text-slate-900 antialiased lg:flex-row">
            <Head>
                <title>Request reset password.</title>
            </Head>
            <Toaster />

            {/* illustrator */}
            <Illustrator />

            {/* form */}
            <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-[55%]">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-100"
                >
                    <motion.div variants={itemVariants} className="mb-10">
                        <h1 className="mb-2 text-[25px] leading-[1.05] font-semibold tracking-tight text-foreground md:text-[35px]">
                            Forgot your password?
                        </h1>

                        <p className="text-[15px] text-balance text-muted-foreground">
                            Enter your email address and we'll send you a link
                            to reset your password.
                        </p>
                    </motion.div>

                    <form
                        onSubmit={handleSubmit}
                        method="post"
                        className="flex flex-col gap-5"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-2"
                        >
                            <Field data-invalid={errors.email ? true : false}>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    autoComplete="username"
                                    placeholder="Enter your email"
                                    value={data.email}
                                    aria-invalid={errors.email ? true : false}
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
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-2">
                            <SlideUpButton
                                className="w-full"
                                disabled={processing}
                                variant="base"
                            >
                                {processing ? 'Processing..' : 'Send link'}
                            </SlideUpButton>
                        </motion.div>
                    </form>

                    <motion.div
                        variants={itemVariants}
                        className="mt-10 text-center text-[14px] text-slate-500"
                    >
                        Remember your password?{' '}
                        <Link
                            href={route('login')}
                            className="font-semibold text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black"
                        >
                            Sign in
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
