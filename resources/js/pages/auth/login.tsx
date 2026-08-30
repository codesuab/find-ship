import { FormEvent, useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Field, FieldLabel, FieldGroup, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SlideUpButton from "@/components/slideup-button";
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { toast, Toaster } from "@/components/ui/toast";
import { PageProps } from "@/types/types";
import { GoogleIcon } from "@/components/icon/Google";
import { FacebookIcon } from "@/components/icon/Facebook";
import Illustrator from "./Illustrator";


export default function Login() {
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
                type: "spring",
                stiffness: 260,
                damping: 24,
            },
        },
    };

    // form
    const { data, setData, processing, errors, post } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: '',
        password: '',
        remember: false,
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('login.post'), {
            preserveScroll: true
        })
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
                <title>Login your account.</title>
            </Head>
            <Toaster />

            {/* illustrator */}
            <Illustrator/>

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
                            Welcome back
                        </h1>

                        <p className="text-[15px] text-muted-foreground text-balance">
                            Sign in to your account to continue to your dashboard.
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
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && (
                                    <FieldDescription className="text-destructive">
                                        {errors.email}
                                    </FieldDescription>
                                )}
                            </Field>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-2"
                        >
                            <Field data-invalid={errors.password ? true : false}>
                                <FieldLabel>Password</FieldLabel>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={data.password}
                                        aria-invalid={errors.password ? true : false}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600"
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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
                            className="mt-1 flex items-center justify-between"
                        >
                            <FieldGroup className="w-1/2">
                                <Field orientation="horizontal">
                                    <Checkbox id="remember" checked={data.remember} onCheckedChange={(checked) => setData('remember', checked === true)} />
                                    <FieldLabel htmlFor="remember">
                                        Keep me signed in
                                    </FieldLabel>
                                </Field>
                            </FieldGroup>
                            <a
                                href={route('ui.forgat')}
                                className="text-[14px] font-medium text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black"
                            >
                                Forgot password?
                            </a>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-2"
                        >
                            <SlideUpButton className="w-full" disabled={processing} variant="base">
                                {processing ? 'Processing..' : 'Sign in'}
                            </SlideUpButton>
                        </motion.div>
                    </form>

                    <motion.div
                        variants={itemVariants}
                        className="mt-4 grid grid-cols-2 gap-3"
                    >
                        <a
                            type="button"
                            href={route('ui.social.redirect', {
                                'type': 'google'
                            })}
                            className="flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-200 bg-white py-3 text-[14px] font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]"
                        >
                            <GoogleIcon className="size-4.5" />
                            Google
                        </a>
                        <a
                            type="button"
                            href={route('ui.social.redirect', {
                                'type': 'facebook'
                            })}
                            className="flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-200 bg-white py-3 text-[14px] font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]"
                        >
                            <FacebookIcon className="size-4.5" />
                            Facebook
                        </a>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-10 text-center text-[14px] text-slate-500"
                    >
                        Don&apos;t have an account?{" "}
                        <Link
                            href={route('ui.sing.up')}
                            className="font-semibold text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black"
                        >
                            Sign up
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div >
    );
}
