import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Toaster } from '@/components/ui/toast';
import { Head, Link, useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Textarea } from '@/components/ui/textarea';

interface StepInterface {
    title: string;
    subtitle: string;
}

export default function index() {
    const stepTitle: Record<number, StepInterface> = {
        1: {
            title: 'Personal Details',
            subtitle:
                'Set up your personal identity, profile avatar, and verified phone number.',
        },
        2: {
            title: 'Company & Business',
            subtitle:
                'Provide your organization credentials, brand logo, industry type, and headquarters.',
        },
    };
    const countryItems = [
        { label: 'Select a country', value: null },
        { label: 'Bangladesh', value: 'bangladesh' },
        { label: 'China', value: 'china' },
        { label: 'India', value: 'india' },
    ];
    const genderItems = [
        { label: 'Select gender', value: null },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ];

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const direction = useRef(1);

    const stepCount = Object.keys(stepTitle).length;

    const contentVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 24 : -24,
            opacity: 0,
            scale: 0.985,
            filter: 'blur(3px)',
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -24 : 24,
            opacity: 0,
            scale: 0.985,
            filter: 'blur(3px)',
        }),
    };

    const contentTransition = {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
    };

    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (step >= stepCount) return;

        direction.current = 1;
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 350));

        setStep((prev) => prev + 1);
        setIsLoading(false);
    };

    const handleBack = () => {
        if (step <= 1) return;

        direction.current = -1;
        setStep((prev) => prev - 1);
    };

    // form
    const personalInfoForm = useForm({
        phone: '',
        avatar: null,
        gender: '',
        country: 'bangladesh',
        city: '',
        zip: '',
        address: '',
    });

    const companyInfoForm = useForm({
        company_logo: null,
        company_name: '',
        company_type: '',
        company_address: '',
    });
    return (
        <div className="flex min-h-screen w-full bg-white font-sans text-slate-900 antialiased lg:flex-row">
            <Head>
                <title>Verify email address.</title>
            </Head>
            <Toaster />

            {/* form */}
            <div className="relative container flex w-full flex-col items-center justify-center">
                <div className="absolute top-0 left-0 flex w-full items-center justify-between gap-4 px-5 py-6">
                    <Link href={route('home')}>
                        <Button variant="link" className="text-foreground">
                            Back Home
                        </Button>
                    </Link>

                    <Link href={route('logout')}>
                        <Button variant="link" className="text-foreground">
                            Sign out
                        </Button>
                    </Link>
                </div>

                {/* tabs */}
                <div className="mx-auto w-full md:w-140">
                    {/* Header */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.h1
                                    key={step}
                                    initial={{ opacity: 0, y: 3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -3 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: 'easeOut',
                                    }}
                                    className="text-base font-medium text-foreground"
                                >
                                    {stepTitle[step].title}
                                </motion.h1>
                            </AnimatePresence>

                            <motion.div
                                layout
                                className="text-sm font-medium text-foreground"
                            >
                                {step}
                                <span className="text-muted-foreground">
                                    /{stepCount} Done
                                </span>
                            </motion.div>
                        </div>

                        <div className="relative h-1 overflow-hidden rounded-full bg-muted">
                            <motion.div
                                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                                animate={{
                                    width: `${(step / stepCount) * 100}%`,
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <motion.div
                        layout
                        transition={{
                            layout: {
                                duration: 0.45,
                                ease: 'linear',
                            },
                        }}
                        className="overflow-hidden"
                    >
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                            custom={direction.current}
                        >
                            <motion.div
                                key={step}
                                custom={direction.current}
                                variants={contentVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={contentTransition}
                                className="py-6"
                            >
                                {/* Header */}
                                <div className="mb-6">
                                    <motion.h2
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: 'easeOut',
                                        }}
                                        className="text-xl font-medium text-foreground"
                                    >
                                        {stepTitle[step].title}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: 'easeOut',
                                        }}
                                        className="text-sm text-muted-foreground"
                                    >
                                        {stepTitle[step].subtitle}
                                    </motion.p>
                                </div>

                                {/* Personal */}
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="space-y-3"
                                    >
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                            <Field
                                                data-invalid={
                                                    !!personalInfoForm.errors
                                                        .country
                                                }
                                            >
                                                <FieldLabel>
                                                    Country*
                                                </FieldLabel>

                                                <Combobox
                                                    items={countryItems}
                                                    onValueChange={(value) =>
                                                        personalInfoForm.setData(
                                                            'country',
                                                            value ?? '',
                                                        )
                                                    }
                                                    defaultValue={
                                                        personalInfoForm.data
                                                            .country
                                                    }
                                                >
                                                    <ComboboxInput
                                                        placeholder="Select a country"
                                                        showClear
                                                        aria-invalid={
                                                            !!personalInfoForm
                                                                .errors.country
                                                        }
                                                        className="h-12 rounded-xl"
                                                    />
                                                    <ComboboxContent>
                                                        <ComboboxEmpty>
                                                            No items found.
                                                        </ComboboxEmpty>
                                                        <ComboboxList>
                                                            {(items, i) => (
                                                                <ComboboxItem
                                                                    key={i}
                                                                    value={
                                                                        items.value
                                                                    }
                                                                >
                                                                    {
                                                                        items.label
                                                                    }
                                                                </ComboboxItem>
                                                            )}
                                                        </ComboboxList>
                                                    </ComboboxContent>
                                                </Combobox>

                                                <FieldDescription className="text-destructive">
                                                    {
                                                        personalInfoForm.errors
                                                            .country
                                                    }
                                                </FieldDescription>
                                            </Field>

                                            <Field
                                                data-invalid={
                                                    !!personalInfoForm.errors
                                                        .city
                                                }
                                            >
                                                <FieldLabel>City*</FieldLabel>

                                                <Input
                                                    type="text"
                                                    placeholder="Enter your city"
                                                    value={
                                                        personalInfoForm.data
                                                            .city
                                                    }
                                                    aria-invalid={
                                                        !!personalInfoForm
                                                            .errors.city
                                                    }
                                                    onChange={(e) =>
                                                        personalInfoForm.setData(
                                                            'city',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <FieldDescription className="text-destructive">
                                                    {
                                                        personalInfoForm.errors
                                                            .city
                                                    }
                                                </FieldDescription>
                                            </Field>
                                        </div>
                                        <Field
                                            data-invalid={
                                                !!personalInfoForm.errors.phone
                                            }
                                        >
                                            <FieldLabel>Phone*</FieldLabel>

                                            <Input
                                                type="tel"
                                                placeholder="Enter your phone"
                                                value={
                                                    personalInfoForm.data.phone
                                                }
                                                aria-invalid={
                                                    !!personalInfoForm.errors
                                                        .phone
                                                }
                                                onChange={(e) =>
                                                    personalInfoForm.setData(
                                                        'phone',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <FieldDescription className="text-destructive">
                                                {personalInfoForm.errors.phone}
                                            </FieldDescription>
                                        </Field>
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                            <Field
                                                data-invalid={
                                                    !!personalInfoForm.errors
                                                        .zip
                                                }
                                            >
                                                <FieldLabel>
                                                    Zip code*
                                                </FieldLabel>

                                                <Input
                                                    type="text"
                                                    placeholder="Enter your zip"
                                                    value={
                                                        personalInfoForm.data
                                                            .zip
                                                    }
                                                    aria-invalid={
                                                        !!personalInfoForm
                                                            .errors.zip
                                                    }
                                                    onChange={(e) =>
                                                        personalInfoForm.setData(
                                                            'zip',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <FieldDescription className="text-destructive">
                                                    {
                                                        personalInfoForm.errors
                                                            .zip
                                                    }
                                                </FieldDescription>
                                            </Field>
                                            <Field
                                                data-invalid={
                                                    !!personalInfoForm.errors
                                                        .gender
                                                }
                                            >
                                                <FieldLabel>Gender*</FieldLabel>

                                                <Combobox
                                                    items={genderItems}
                                                    onValueChange={(value) =>
                                                        personalInfoForm.setData(
                                                            'gender',
                                                            value ?? '',
                                                        )
                                                    }
                                                    defaultValue={
                                                        personalInfoForm.data
                                                            .gender
                                                    }
                                                >
                                                    <ComboboxInput
                                                        placeholder="Select gender"
                                                        showClear
                                                        aria-invalid={
                                                            !!personalInfoForm
                                                                .errors.gender
                                                        }
                                                        className="h-12 rounded-xl"
                                                    />
                                                    <ComboboxContent>
                                                        <ComboboxEmpty>
                                                            No items found.
                                                        </ComboboxEmpty>
                                                        <ComboboxList>
                                                            {(items, i) => (
                                                                <ComboboxItem
                                                                    key={i}
                                                                    value={
                                                                        items.value
                                                                    }
                                                                >
                                                                    {
                                                                        items.label
                                                                    }
                                                                </ComboboxItem>
                                                            )}
                                                        </ComboboxList>
                                                    </ComboboxContent>
                                                </Combobox>

                                                <FieldDescription className="text-destructive">
                                                    {
                                                        personalInfoForm.errors
                                                            .gender
                                                    }
                                                </FieldDescription>
                                            </Field>
                                        </div>
                                        <Field
                                            data-invalid={
                                                !!personalInfoForm.errors
                                                    .address
                                            }
                                        >
                                            <FieldLabel>Address*</FieldLabel>
                                            <Textarea
                                                placeholder="Enter your address"
                                                value={
                                                    personalInfoForm.data.address
                                                }
                                                aria-invalid={
                                                    !!personalInfoForm.errors
                                                        .address
                                                }
                                                onChange={(e) =>
                                                    personalInfoForm.setData(
                                                        'address',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <FieldDescription className="text-destructive">
                                                {
                                                    personalInfoForm.errors
                                                        .address
                                                }
                                            </FieldDescription>
                                        </Field>
                                    </motion.div>
                                )}

                                {/* Company */}
                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        <Field
                                            data-invalid={
                                                !!companyInfoForm.errors
                                                    .company_name
                                            }
                                        >
                                            <FieldLabel>
                                                Company Name
                                            </FieldLabel>

                                            <Input
                                                type="text"
                                                placeholder="Enter your company name"
                                                value={
                                                    companyInfoForm.data
                                                        .company_name
                                                }
                                                aria-invalid={
                                                    !!companyInfoForm.errors
                                                        .company_name
                                                }
                                                onChange={(e) =>
                                                    companyInfoForm.setData(
                                                        'company_name',
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <AnimatePresence initial={false}>
                                                {companyInfoForm.errors
                                                    .company_name && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            height: 0,
                                                            y: -4,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            height: 'auto',
                                                            y: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            height: 0,
                                                            y: -4,
                                                        }}
                                                    >
                                                        <FieldDescription className="text-destructive">
                                                            {
                                                                companyInfoForm
                                                                    .errors
                                                                    .company_name
                                                            }
                                                        </FieldDescription>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Field>

                                        {/* Other company fields */}
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Footer */}
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
                        <div>
                            <AnimatePresence initial={false}>
                                {step > 1 && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            x: -8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: -8,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeOut',
                                        }}
                                    >
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleBack}
                                            disabled={isLoading}
                                        >
                                            Back
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div
                            layout
                            transition={{
                                layout: {
                                    duration: 0.35,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            }}
                        >
                            <Button
                                type="button"
                                onClick={handleNext}
                                disabled={isLoading}
                                className={cn(
                                    'relative overflow-hidden',
                                    step === 1 && 'w-full',
                                )}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isLoading ? (
                                        <motion.span
                                            key="loading"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.7,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.7,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                            className="flex items-center"
                                        >
                                            <Loader className="size-5 animate-spin" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key={
                                                step === stepCount
                                                    ? 'finish'
                                                    : 'continue'
                                            }
                                            initial={{
                                                opacity: 0,
                                                y: 4,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -4,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                        >
                                            {step === stepCount
                                                ? 'Finish setup'
                                                : 'Continue'}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
