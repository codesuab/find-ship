import { FormEvent, useEffect} from 'react';
import { motion, type Variants } from 'motion/react';
import SlideUpButton from '@/components/slideup-button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { toast, Toaster } from '@/components/ui/toast';
import { PageProps } from '@/types/types';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Label } from '@/components/ui/label';
import { FieldDescription } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import Illustrator from '@/components/auth/Illustrator';
import AuthHeader from '@/components/auth/AuthHeader';
import { Separator } from '@/components/ui/separator';

export default function Mail({ retry_after }: { retry_after?: Number }) {
    const { flash, auth } = usePage<PageProps>().props;
    const user = auth?.user;

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
        otp?: any;
    }>({
        otp: '',
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('ui.mail.verify.logic'), {
            preserveScroll: true,
        });
    };

    // resend form
    const resendFrom = useForm({
        id: '',
    });
    const handleResend = (e: any) => {
        e.preventDefault();

        resendFrom.post(route('ui.mail.verify.resend'), {
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
        <div className="relative flex min-h-screen w-full bg-white font-sans text-slate-900 antialiased lg:flex-row">
            <Head>
                <title>Verify email address.</title>
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
                    className="w-full md:max-w-100"
                >
                    <AuthHeader
                        title="Verify your email"
                        subtitle="We've sent a verification link to your email.
                            Please check your inbox to verify your account."
                    />

                    <motion.form
                        onSubmit={handleSubmit}
                        method="post"
                        className="flex flex-col gap-4"
                        variants={itemVariants}
                    >
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor={String(user?.id)}>
                                    Enter verification code
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    This code contains numbers only (0–9).
                                </p>
                            </div>

                            <InputOTP
                                id={String(user?.id)}
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS}
                                onChange={(e) => setData('otp', e)}
                                className="flex w-full justify-center gap-4"
                                disabled={resendFrom.processing}
                            >
                                <InputOTPGroup className="flex w-full justify-center gap-2">
                                    <InputOTPSlot
                                        index={0}
                                        className="h-12.5 w-12.5 rounded-sm! border text-lg data-[active=true]:border-primary/50 data-[active=true]:ring-2! data-[active=true]:ring-primary/30! md:h-14 md:w-14"
                                    />
                                    <InputOTPSlot
                                        index={1}
                                        className="h-12.5 w-12.5 rounded-sm! border text-lg data-[active=true]:border-primary/50 data-[active=true]:ring-2! data-[active=true]:ring-primary/30! md:h-14 md:w-14"
                                    />
                                    <InputOTPSlot
                                        index={2}
                                        className="h-12.5 w-12.5 rounded-sm! border text-lg data-[active=true]:border-primary/50 data-[active=true]:ring-2! data-[active=true]:ring-primary/30! md:h-14 md:w-14"
                                    />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup className="flex w-full justify-center gap-2">
                                    <InputOTPSlot
                                        index={3}
                                        className="h-12.5 w-12.5 rounded-sm! border text-lg data-[active=true]:border-primary/50 data-[active=true]:ring-2! data-[active=true]:ring-primary/30! md:h-14 md:w-14"
                                    />
                                    <InputOTPSlot
                                        index={4}
                                        className="h-12.5 w-12.5 rounded-sm! border text-lg data-[active=true]:border-primary/50 data-[active=true]:ring-2! data-[active=true]:ring-primary/30! md:h-14 md:w-14"
                                    />
                                    <InputOTPSlot
                                        index={5}
                                        className="h-12.5 w-12.5 rounded-sm! border text-lg data-[active=true]:border-primary/50 data-[active=true]:ring-2! data-[active=true]:ring-primary/30! md:h-14 md:w-14"
                                    />
                                </InputOTPGroup>
                            </InputOTP>
                            <Label>
                                Didn't receive the email?{' '}
                                <Button
                                    onClick={handleResend}
                                    disabled={resendFrom.processing}
                                    variant="link"
                                    className="h-0 p-0"
                                >
                                    {resendFrom.processing ? (
                                        <>
                                            <Loader className="size-4 animate-spin" />
                                            Sending..
                                        </>
                                    ) : (
                                        'Resend verification code'
                                    )}
                                </Button>
                            </Label>

                            {errors.otp && (
                                <FieldDescription className="text-destructive">
                                    {errors.otp}
                                </FieldDescription>
                            )}
                        </div>

                        <motion.div variants={itemVariants} className="mt-2">
                            <SlideUpButton
                                className="w-full"
                                disabled={
                                    processing ||
                                    data.otp.length !== 6 ||
                                    resendFrom.processing
                                }
                                variant="base"
                            >
                                {processing ? 'Processing..' : 'Verify now'}
                            </SlideUpButton>
                        </motion.div>
                    </motion.form>

                    <motion.div
                        variants={itemVariants}
                        className="mt-4 text-center flex items-center gap-2 text-[14px] text-slate-500"
                    >
                        <span>Already verified your email?</span>
                        <div className="flex items-center gap-2">
                            <Link
                                href={route('ui.sing.up')}
                                className="font-semibold text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black"
                            >
                                Back to login
                            </Link>
                            <Separator orientation='vertical' />
                            <Link
                                href={route('logout')}
                                className="font-semibold text-slate-800 underline decoration-slate-800 underline-offset-4 transition-colors hover:text-black"
                            >
                                Sing out
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
