import { FormEvent, useState } from "react";
import { motion, type Variants } from "motion/react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SlideUpButton from "@/components/slideup-button";
import { Head, Link } from '@inertiajs/react'

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Login request
    };

    return (
        <div className="flex min-h-screen w-full bg-white font-sans text-slate-900 antialiased lg:flex-row">
            <Head>
                <title>Login your account.</title>
            </Head>


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
                        className="flex flex-col gap-5"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-2"
                        >
                            <Field>
                                <FieldLabel>Email or username</FieldLabel>
                                <Input
                                    type="text"
                                    autoComplete="username"
                                    placeholder="Enter your email"
                                    required
                                />
                            </Field>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-2"
                        >
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        required
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
                            </Field>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-1 flex items-center justify-between"
                        >
                            <FieldGroup className="w-1/2">
                                <Field orientation="horizontal">
                                    <Checkbox id="remember" />
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
                            <SlideUpButton className="w-full">
                                Sign in
                            </SlideUpButton>
                        </motion.div>
                    </form>

                    <motion.div
                        variants={itemVariants}
                        className="mt-4"
                    >
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-200 bg-white py-3 text-[14px] font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]"
                        >
                            <GoogleIcon className="size-4.5" />
                            Sign in with Google
                        </button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-10 text-center text-[14px] text-slate-500"
                    >
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/sing-up"
                            className="font-semibold text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black"
                        >
                            Sign up
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}