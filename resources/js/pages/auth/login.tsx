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
            <div className="relative hidden w-[45%] lg:flex lg:min-h-screen">
                <div className="relative h-full w-full overflow-hidden bg-neutral-100 shadow-xl">
                    <img
                        src="/media/system/auth-banner.avif"
                        alt=""
                        className="absolute inset-0 h-full w-full object-fill"
                    />

                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />

                    <div className="absolute left-10 bottom-10 w-[60%]">
                        <motion.h2
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-lg text-white capitalize">You can easily</motion.h2>
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.2,
                            }}
                            viewport={{ once: true }}
                            className="text-5xl font-semibold text-white mt-3">Get complete visibility into every vessel movement</motion.h1>
                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.3,
                            }}
                            viewport={{ once: true }}
                            className="text-base font-light text-white  mt-3">Track arrivals, departures, schedules, and port activity from one centralized hub built for modern maritime operations.</motion.p>
                    </div>

                    <div className="flex items-center justify-between w-[90%] absolute top-10 left-10">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                x: -30,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'easeOut'
                            }}
                            viewport={{ once: true }}
                            className="text-xl font-bold text-white">
                            FindShip
                        </motion.h1>

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 1,
                                ease: 'easeOut'
                            }}
                            viewport={{ once: true }}>
                            <Link href='/' className="flex text-white text-base duration-300 hover:underline font-medium capitalize items-center gap-1 group">
                                <ChevronLeft size={16} className="mt-0.5 duration-300 group-hover:mr-1" />
                                <span>Back to Website</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* form */}
            <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-[55%]">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-100"
                >
                    <motion.div variants={itemVariants} className="mb-10">
                        <h1 className="mb-4 text-[35px] md:text-[48px] font-semibold leading-[1.05] tracking-tight text-foreground">
                            Welcome
                            <br />
                            back
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
                                <FieldLabel>Email or username</FieldLabel>
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
                                href="/forgot-password"
                                className="text-[14px] font-medium text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black"
                            >
                                Forgot password?
                            </a>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-2"
                        >
                            <SlideUpButton className="w-full" disabled={processing}>
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
