import { FormEvent, useEffect, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SlideUpButton from '@/components/slideup-button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { GoogleIcon } from '@/components/icon/Google';
import { FacebookIcon } from '@/components/icon/Facebook';
import { PageProps } from '@/types/types';
import { toast, Toaster } from '@/components/ui/toast';

export default function SingUp() {
    const { flash } = usePage<PageProps>().props;
    const [showPassword, setShowPassword] = useState(false);
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

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        password: string;
        email: string;
    }>({
        name: '',
        email: '',
        password: '',
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('ui.sing.up.post'), {
            preserveScroll: true,
            onError: (e) => console.log(e),
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
                <title>Create new account.</title>
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

                    <div className="absolute bottom-10 left-10 w-[60%]">
                        <motion.h2
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                            }}
                            viewport={{ once: true }}
                            className="text-lg text-white capitalize"
                        >
                            You can easily
                        </motion.h2>
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.2,
                            }}
                            viewport={{ once: true }}
                            className="mt-3 text-5xl font-semibold text-white"
                        >
                            Get complete visibility into every vessel movement
                        </motion.h1>
                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: 'blur(5px)',
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.3,
                            }}
                            viewport={{ once: true }}
                            className="mt-3 text-base font-light text-white"
                        >
                            Track arrivals, departures, schedules, and port
                            activity from one centralized hub built for modern
                            maritime operations.
                        </motion.p>
                    </div>

                    <div className="absolute top-10 left-10 flex w-[90%] items-center justify-between">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                x: -30,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'easeOut',
                            }}
                            viewport={{ once: true }}
                            className="text-xl font-bold text-white"
                        >
                            FindShip
                        </motion.h1>

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 1,
                                ease: 'easeOut',
                            }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href="/"
                                className="group flex items-center gap-1 text-base font-medium text-white capitalize duration-300 hover:underline"
                            >
                                <ChevronLeft
                                    size={16}
                                    className="mt-0.5 duration-300 group-hover:mr-1"
                                />
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
                        <h1 className="mb-4 text-[35px] leading-[1.05] font-semibold tracking-tight text-foreground md:text-[48px]">
                            Create your free account
                        </h1>

                        <p className="text-[15px] text-balance text-muted-foreground">
                            Join modern port teams managing vessel operations
                            smarter, faster, and with confidence.
                        </p>
                    </motion.div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-2"
                        >
                            <Field data-invalid={errors.name ? true : false}>
                                <FieldLabel>Name</FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    aria-invalid={errors.name ? true : false}
                                />
                                {errors.name && (
                                    <FieldDescription className="text-destructive">
                                        {errors.name}
                                    </FieldDescription>
                                )}
                            </Field>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-2"
                        >
                            <Field data-invalid={errors.email ? true : false}>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    aria-invalid={errors.email ? true : false}
                                />
                                <FieldDescription className="text-xs">
                                    Only Gmail, Yahoo, Outlook, and iCloud email
                                    addresses are accepted.
                                </FieldDescription>
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
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        aria-invalid={
                                            errors.password ? true : false
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

                        <motion.div variants={itemVariants} className="mt-2">
                            <SlideUpButton className="w-full" variant='base'>
                                {processing ? 'Processing..' : 'Sign up'}
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
                                type: 'google',
                            })}
                            className="flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-200 bg-white py-3 text-[14px] font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]"
                        >
                            <GoogleIcon className="size-4.5" />
                            Google
                        </a>
                        <a
                            type="button"
                            href={route('ui.social.redirect', {
                                type: 'facebook',
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
                        Already have an account?{' '}
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
