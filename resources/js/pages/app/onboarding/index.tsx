import { Button } from '@/components/ui/button';
import { toast, Toaster } from '@/components/ui/toast';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Loader } from 'lucide-react';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageProps } from '@/types/types';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface StepInterface {
    title: string;
    subtitle: string;
}

interface UserData {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    phone: string | null;
    gender: string | null;
    country: string | null;
    city: string | null;
    zip: string | null;
    address: string | null;

    company_logo: string | null;
    company_name: string | null;
    company_type: string | null;
    company_address: string | null;
}

interface Country {
    label: string;
    value: string | null;
}

interface CountryProps {
    country: Country[];
}

export default function index({
    userData,
    country,
    userHasPassword,
}: {
    userData?: UserData;
    country: CountryProps[];
    userHasPassword: boolean;
}) {
    // flash message
    const { flash } = usePage<PageProps>().props;
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

    // data
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
        3: {
            title: "You're all set! 👋",
            subtitle:
                'We’ve tailored your maritime dashboard to help you track vessels, monitor ports, and stay ahead of arrivals and departures.',
        },
    };
    const genderItems = [
        { label: 'Select gender', value: null },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ];
    const COMPANY_TYPES = [
        {
            value: 'shipping',
            label: 'Shipping Company',
        },
        {
            value: 'freight',
            label: 'Freight Forwarder',
        },
        {
            value: 'import_export',
            label: 'Import / Export',
        },
        {
            value: 'logistics',
            label: 'Logistics & 3PL',
        },
        {
            value: 'technology',
            label: 'Tech & Software',
        },
        {
            value: 'other',
            label: 'Other Enterprise',
        },
    ];

    // animation
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

    // controller
    const handleBack = () => {
        if (step <= 1) return;

        direction.current = -1;
        setStep((prev) => prev - 1);
    };

    // form
    const personalInfoForm = useForm({
        phone: userData?.phone || '',
        avatar: null as File | null,
        gender: userData?.gender || '',
        country: userData?.country || '',
        city: userData?.city || '',
        zip: userData?.zip || '',
        address: userData?.address || '',
        password: '',
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        personalInfoForm.setData('avatar', file);

        if (avatarPreview) {
            URL.revokeObjectURL(avatarPreview);
        }

        setAvatarPreview(file ? URL.createObjectURL(file) : null);
    };

    const companyInfoForm = useForm({
        company_logo: null as File | null,
        company_name: userData?.company_name || '',
        company_type: userData?.company_type || '',
        company_address: userData?.company_address || '',
    });
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        companyInfoForm.setData('company_logo', file);

        if (logoPreview) {
            URL.revokeObjectURL(logoPreview);
        }

        setLogoPreview(file ? URL.createObjectURL(file) : null);
    };

    // is complete
    const isCompletePersonal = Boolean(
        userData?.phone &&
        userData?.country &&
        userData?.city &&
        userData?.gender &&
        userData?.zip &&
        userData?.address,
    );

    const hasPassword: boolean = personalInfoForm.data.password?.trim() !== '';
    const isPersonalChanged = Boolean(
        userData?.phone !== personalInfoForm.data.phone ||
        userData?.country !== personalInfoForm.data.country ||
        userData?.city !== personalInfoForm.data.city ||
        userData?.gender !== personalInfoForm.data.gender ||
        userData?.zip !== personalInfoForm.data.zip ||
        userData?.address !== personalInfoForm.data.address ||
        userHasPassword !== hasPassword,
    );

    const isCompleteCompany = Boolean(
        userData?.company_name &&
        userData?.company_type &&
        userData?.company_address,
    );
    const isCompanyChanged = Boolean(
        userData?.company_name !== companyInfoForm.data.company_name ||
        userData?.company_type !== companyInfoForm.data.company_type ||
        userData?.company_address !== companyInfoForm.data.company_address,
    );

    const shouldSubmitPersonal = !isCompletePersonal || isPersonalChanged;
    const shouldSubmitCompany = !isCompleteCompany || isCompanyChanged;

    // step
    const [step, setStep] = useState(
        isCompletePersonal && isCompleteCompany
            ? 3
            : isCompletePersonal
              ? 2
              : 1,
    );
    const [isLoading, setIsLoading] = useState(false);
    const direction = useRef(1);
    const stepCount = Object.keys(stepTitle).length;

    // controller
    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (step > stepCount) return;

        direction.current = 1;
        setIsLoading(true);

        // for personal information
        if (step == 1) {
            if (!shouldSubmitPersonal) {
                setStep((prev) => prev + 1);
                setIsLoading(false);
                return;
            }
            personalInfoForm.post(route('app.onboarding.personal'), {
                preserveScroll: true,
                onSuccess: () => {
                    setStep((prev) => prev + 1);
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                },
            });
        }

        // for company info
        if (step == 2) {
            if (!shouldSubmitCompany) {
                setStep((prev) => prev + 1);
                setIsLoading(false);
                return;
            }
            companyInfoForm.post(route('app.onboarding.company'), {
                preserveScroll: true,
                onSuccess: () => {
                    setStep((prev) => prev + 1);
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                },
            });
        }

        // final
        if (step == 3) {
            router.post(route('app.onboarding.final'), {
                preserveScroll: true,
            });
        }
    };
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white font-sans text-slate-900 antialiased">
            <Head>
                <title>Verify email address.</title>
            </Head>
            <Toaster />

            {/* form */}
            <div className="container flex w-full flex-col items-center justify-center">
                {/* tabs */}
                <div className="mx-auto w-full py-10 md:w-140">
                    {/* Header */}
                    <div>
                        <div className="fixed top-0 left-0 z-10 mb-2 flex w-full items-center justify-between border-b border-border bg-white px-5 py-4 md:static md:z-auto md:border-b-0 md:bg-transparent md:px-0 md:py-0">
                            <div className="flex h-5 items-center gap-3">
                                <Link href={route('home')} className="group">
                                    <Button
                                        variant="link"
                                        className="p-0 text-foreground"
                                    >
                                        <ArrowLeft className="size-4 duration-300 group-hover:-translate-x-1" />{' '}
                                        Back Home
                                    </Button>
                                </Link>
                                <Separator orientation="vertical" />
                                <Link href={route('logout')} className="group">
                                    <Button
                                        variant="link"
                                        className="p-0 text-foreground"
                                    >
                                        Sign out
                                    </Button>
                                </Link>
                            </div>

                            <motion.div
                                layout
                                className="text-sm font-medium text-foreground"
                            >
                                {step}
                                <span className="text-muted-foreground">
                                    /{stepCount} Completed
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
                        className="overflow-hidden pt-4 md:pt-0"
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
                                className="py-4"
                            >
                                {/* Header */}
                                {step < stepCount && (
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
                                )}

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
                                        <Label
                                            className="flex flex-col items-start gap-1 pb-3"
                                            htmlFor="avatar"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Avatar size="xl">
                                                    <AvatarImage
                                                        src={
                                                            avatarPreview ||
                                                            `/storage/${userData?.avatar}` ||
                                                            ''
                                                        }
                                                        alt={
                                                            userData?.name ||
                                                            'Avatar'
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {userData?.name
                                                            ?.slice(0, 2)
                                                            .toLocaleUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="rounded-lg bg-primary px-3 py-1.5 font-normal text-white">
                                                    Select Photo
                                                </span>
                                            </div>
                                            <Input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                className="hidden"
                                                id="avatar"
                                                onChange={handleAvatarChange}
                                            />
                                            <FieldDescription className="text-destructive">
                                                {personalInfoForm.errors.avatar}
                                            </FieldDescription>
                                        </Label>
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
                                                    items={country}
                                                    onValueChange={(value) =>
                                                        personalInfoForm.setData(
                                                            'country',
                                                            (value as
                                                                | string
                                                                | null) ?? '',
                                                        )
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
                                                        value={
                                                            personalInfoForm
                                                                .data.country
                                                        }
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
                                        {!userHasPassword && (
                                            <Field
                                                data-invalid={
                                                    !!personalInfoForm.errors
                                                        .phone
                                                }
                                            >
                                                <FieldLabel>
                                                    Password
                                                </FieldLabel>

                                                <Input
                                                    type="tel"
                                                    placeholder="Enter your phone"
                                                    value={
                                                        personalInfoForm.data
                                                            .password
                                                    }
                                                    aria-invalid={
                                                        !!personalInfoForm
                                                            .errors.password
                                                    }
                                                    onChange={(e) =>
                                                        personalInfoForm.setData(
                                                            'password',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <FieldDescription className="text-xs">
                                                    Set a password to secure
                                                    your account and sign in
                                                    without using your social
                                                    account.
                                                </FieldDescription>
                                                <FieldDescription className="text-destructive">
                                                    {
                                                        personalInfoForm.errors
                                                            .password
                                                    }
                                                </FieldDescription>
                                            </Field>
                                        )}
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
                                                    personalInfoForm.data
                                                        .address
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
                                        className="space-y-3"
                                    >
                                        <Label
                                            className="flex flex-col items-start gap-1 pb-3"
                                            htmlFor="logo"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Avatar size="xl">
                                                    <AvatarImage
                                                        src={
                                                            logoPreview ||
                                                            `/storage/${userData?.company_logo}` ||
                                                            ''
                                                        }
                                                        alt={
                                                            companyInfoForm
                                                                ?.data
                                                                .company_name ||
                                                            'Company logo'
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {companyInfoForm?.data.company_name
                                                            ?.slice(0, 2)
                                                            .toLocaleUpperCase() ||
                                                            userData?.name
                                                                ?.slice(0, 2)
                                                                .toLocaleUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="rounded-lg bg-primary px-3 py-1.5 font-normal text-white">
                                                    Select Logo
                                                </span>
                                            </div>

                                            <Input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                className="hidden"
                                                id="logo"
                                                onChange={handleLogoChange}
                                            />
                                            <FieldDescription className="text-destructive">
                                                {
                                                    companyInfoForm.errors
                                                        .company_logo
                                                }
                                            </FieldDescription>
                                        </Label>

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
                                            <FieldDescription className="text-destructive">
                                                {
                                                    companyInfoForm.errors
                                                        .company_name
                                                }
                                            </FieldDescription>
                                        </Field>

                                        <Field
                                            data-invalid={
                                                !!companyInfoForm.errors
                                                    .company_type
                                            }
                                        >
                                            <FieldLabel>
                                                Company Type / Business Sector
                                            </FieldLabel>
                                            <Combobox
                                                items={COMPANY_TYPES}
                                                onValueChange={(value) =>
                                                    companyInfoForm.setData(
                                                        'company_type',
                                                        (value as
                                                            string | null) ??
                                                            '',
                                                    )
                                                }
                                            >
                                                <ComboboxInput
                                                    placeholder="Select a country"
                                                    showClear
                                                    aria-invalid={
                                                        !!companyInfoForm.errors
                                                            .company_type
                                                    }
                                                    className="h-12 rounded-xl"
                                                    value={
                                                        COMPANY_TYPES.find(
                                                            (val) =>
                                                                val.value ==
                                                                companyInfoForm
                                                                    .data
                                                                    .company_type,
                                                        )?.label
                                                    }
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
                                                                {items.label}
                                                            </ComboboxItem>
                                                        )}
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                            <FieldDescription className="text-destructive">
                                                {
                                                    companyInfoForm.errors
                                                        .company_type
                                                }
                                            </FieldDescription>
                                        </Field>

                                        <Field
                                            data-invalid={
                                                !!companyInfoForm.errors
                                                    .company_address
                                            }
                                        >
                                            <FieldLabel>Address*</FieldLabel>
                                            <Textarea
                                                placeholder="Enter your address"
                                                value={
                                                    companyInfoForm.data
                                                        .company_address
                                                }
                                                aria-invalid={
                                                    !!companyInfoForm.errors
                                                        .company_address
                                                }
                                                onChange={(e) =>
                                                    companyInfoForm.setData(
                                                        'company_address',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <FieldDescription className="text-destructive">
                                                {
                                                    companyInfoForm.errors
                                                        .company_address
                                                }
                                            </FieldDescription>
                                        </Field>
                                    </motion.div>
                                )}

                                {/* final */}
                                {step === 3 && (
                                    <div className="mx-auto flex w-full flex-col items-center justify-center p-5 md:w-[60%]">
                                        <DotLottieReact
                                            src="/animations/success.lottie"
                                            autoplay
                                            className="-my-10 h-40 w-40"
                                        />
                                        <h1 className="text-center text-2xl font-bold text-foreground">
                                            You're all set! 👋
                                        </h1>
                                        <p className="text-center text-base text-muted-foreground">
                                            We’ve tailored your maritime
                                            dashboard to help you track vessels,
                                            monitor ports, and stay ahead of
                                            arrivals and departures.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Footer */}
                    <div className="mt-2 flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="order-1 text-sm text-muted-foreground md:order-0">
                            Need help?{' '}
                            <Link
                                href={route('ux.contact.index')}
                                className="font-medium text-foreground underline-offset-4 hover:underline"
                            >
                                Contact our support team
                            </Link>
                        </p>

                        <div className="flex items-center gap-3">
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
                                                size="lg"
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
                                    size="lg"
                                >
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
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
                                                className="flex items-center gap-1"
                                            >
                                                {step === stepCount ? (
                                                    <>
                                                        Launch Workspace{' '}
                                                        <ArrowRight className="size-4 text-white" />
                                                    </>
                                                ) : (
                                                    'Continue'
                                                )}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
