import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toast';
import { Head, Link, router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function index() {
    const [step, setStep] = useState(0);
    const direction = useRef(1);

    const [form, setForm] = useState({
        company_name: '',
        business_type: '',
        country: '',
        timezone: '',
        phone: '',
    });

    const update = (key: keyof typeof form, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const tabs = [
        {
            title: 'Tell us about your business',
            description: 'Add your business information to get started.',
        },
        {
            title: 'Where is your business located?',
            description: 'This helps us provide relevant information.',
        },
        {
            title: 'Contact information',
            description: 'Add your contact information.',
        },
        {
            title: "You're all set",
            description: 'Your ShipFinder workspace is ready.',
        },
    ];

    const next = () => {
        direction.current = 1;

        if (step < tabs.length - 1) {
            setStep((prev) => prev + 1);
        } else {
            router.post(route('app.onboarding.complete'), form);
        }
    };

    const previous = () => {
        direction.current = -1;
        setStep((prev) => Math.max(0, prev - 1));
    };

    return (
        <div className="relative flex min-h-screen w-full bg-white font-sans text-slate-900 antialiased lg:flex-row">
            <Head>
                <title>Verify email address.</title>
            </Head>
            <Toaster />

            {/* form */}
            <div className="relative container flex w-full flex-col items-center justify-center">
                <div className="absolute top-0 left-0 flex w-full items-center justify-between gap-4 px-5 py-6">
                    <Link href={route('home')}>
                        <Logo imageSize="h-10 w-10" />
                    </Link>

                    <Link href={route('logout')}>
                        <Button variant="secondary">
                            <LogOut className="size-3" />
                            Logout
                        </Button>
                    </Link>
                </div>

                {/* tabs */}
                <motion.div
                    layout
                    transition={{
                        layout: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    }}
                    className="mx-auto w-full md:w-120"
                >
                    <div className="mb-1 flex items-center justify-between gap-5">
                        <h1 className="text-md font-semibold">
                            Getting Started
                        </h1>

                        <p className="text-sm font-medium">
                            {step + 1}/
                            <span className="text-muted-foreground">
                                {tabs.length} Done
                            </span>
                        </p>
                    </div>

                    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                            className="h-full bg-primary"
                            animate={{
                                width: `${((step + 1) / tabs.length) * 100}%`,
                            }}
                            transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />
                    </div>

                    <motion.div
                        layout
                        className="relative py-8"
                        transition={{
                            layout: {
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            },
                        }}
                    >
                        <AnimatePresence
                            initial={false}
                            custom={direction.current}
                        >
                            <motion.div
                                key={step}
                                custom={direction.current}
                                variants={{
                                    enter: (direction: number) => ({
                                        opacity: 0,
                                        x: direction > 0 ? 45 : -45,
                                        filter: 'blur(8px)',
                                    }),
                                    center: {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                    },
                                    exit: (direction: number) => ({
                                        opacity: 0,
                                        x: direction > 0 ? -45 : 45,
                                        filter: 'blur(8px)',
                                    }),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="w-full"
                            >
                                <div className="mb-10">
                                    <h2 className="text-4xl font-semibold tracking-tight">
                                        {tabs[step].title}
                                    </h2>

                                    <p className="mt-3 text-muted-foreground">
                                        {tabs[step].description}
                                    </p>
                                </div>

                                {step === 0 && (
                                    <div className="space-y-4">
                                        <input
                                            value={form.company_name}
                                            onChange={(e) =>
                                                update(
                                                    'company_name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Company name"
                                            className="w-full rounded-lg border px-4 py-3"
                                        />

                                        <select
                                            value={form.business_type}
                                            onChange={(e) =>
                                                update(
                                                    'business_type',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border px-4 py-3"
                                        >
                                            <option value="">
                                                Select business type
                                            </option>
                                            <option value="shipping">
                                                Shipping Company
                                            </option>
                                            <option value="freight">
                                                Freight Forwarder
                                            </option>
                                            <option value="import_export">
                                                Import / Export
                                            </option>
                                        </select>
                                    </div>
                                )}

                                {step === 1 && (
                                    <div className="space-y-4">
                                        <select
                                            value={form.country}
                                            onChange={(e) =>
                                                update(
                                                    'country',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border px-4 py-3"
                                        >
                                            <option value="">
                                                Select country
                                            </option>
                                            <option value="BD">
                                                Bangladesh
                                            </option>
                                            <option value="IN">India</option>
                                            <option value="SG">
                                                Singapore
                                            </option>
                                        </select>

                                        <select
                                            value={form.timezone}
                                            onChange={(e) =>
                                                update(
                                                    'timezone',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border px-4 py-3"
                                        >
                                            <option value="">
                                                Select timezone
                                            </option>
                                            <option value="Asia/Dhaka">
                                                Asia/Dhaka
                                            </option>
                                            <option value="Asia/Kolkata">
                                                Asia/Kolkata
                                            </option>
                                            <option value="Asia/Singapore">
                                                Asia/Singapore
                                            </option>
                                        </select>
                                    </div>
                                )}

                                {step === 2 && (
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) =>
                                            update('phone', e.target.value)
                                        }
                                        placeholder="+880 1XXXXXXXXX"
                                        className="w-full rounded-lg border px-4 py-3"
                                    />
                                )}

                                {step === 3 && (
                                    <div className="rounded-xl border p-8 text-center">
                                        🚢
                                        <p className="mt-3">
                                            Your workspace is ready.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <div className="flex items-center justify-between border-t pt-6">
                        <button
                            type="button"
                            onClick={previous}
                            disabled={step === 0}
                            className="rounded-lg px-5 py-2.5 disabled:opacity-30"
                        >
                            Back
                        </button>

                        <motion.button
                            type="button"
                            onClick={next}
                            whileTap={{ scale: 0.96 }}
                            className="rounded-lg bg-primary px-6 py-2.5 text-primary-foreground"
                        >
                            {step === tabs.length - 1
                                ? 'Get Started'
                                : 'Continue'}
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* bg */}
            <div className="absolute -top-50 -left-50 z-1 hidden h-100 w-100 rounded-full bg-primary/30 blur-3xl md:block"></div>
        </div>
    );
}
