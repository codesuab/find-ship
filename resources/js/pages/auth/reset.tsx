import { FormEvent, useEffect, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SlideUpButton from '@/components/slideup-button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { toast, Toaster } from '@/components/ui/toast';
import { PageProps } from '@/types/types';
import Illustrator from '../../components/auth/Illustrator';
import AuthHeader from '@/components/auth/AuthHeader';

interface DateProps {
    email: string;
    token: string;
}

interface FromData {
    password: string;
    password_confirmation: string;
    token: string;
    email: string;
}

export default function reset({ email, token }: DateProps) {
    const [showPassword, setShowPassword] = useState(false);
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
    const { data, setData, processing, errors, post } = useForm<FromData>({
        password: '',
        password_confirmation: '',
        email: email || '',
        token: token || '',
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('ui.reset.password.post'), {
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
                <title>Reset your password.</title>
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
                    <AuthHeader
                        title="Reset your password"
                        subtitle="Enter a new password below to secure your account."
                    />

                    <form
                        onSubmit={handleSubmit}
                        method="post"
                        className="flex flex-col gap-5"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-2"
                        >
                            <Field
                                data-invalid={errors.password ? true : false}
                            >
                                <FieldLabel>Password</FieldLabel>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={data.password}
                                        aria-invalid={
                                            errors.password ? true : false
                                        }
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <Eye size={20} />
                                        ) : (
                                            <EyeOff size={20} />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <FieldDescription className="text-destructive">
                                        {errors.password}
                                    </FieldDescription>
                                )}
                            </Field>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-2"
                        >
                            <Field
                                data-invalid={
                                    errors.password_confirmation ? true : false
                                }
                            >
                                <FieldLabel>Confirm Password</FieldLabel>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={data.password_confirmation}
                                        aria-invalid={
                                            errors.password_confirmation
                                                ? true
                                                : false
                                        }
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <Eye size={20} />
                                        ) : (
                                            <EyeOff size={20} />
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <FieldDescription className="text-destructive">
                                        {errors.password_confirmation}
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
                                {processing ? 'Processing..' : 'Update'}
                            </SlideUpButton>
                        </motion.div>
                    </form>

                    <motion.div
                        variants={itemVariants}
                        className="mt-4 text-center text-[14px] text-slate-500"
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
