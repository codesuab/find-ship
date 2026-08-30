import PageHeader from '@/components/PageHeader';
import CustomerLayout from '@/Layouts/CustomerLayout';
import {
    Building2,
    CircleX,
    Eye,
    EyeOff,
    FingerprintPattern,
    Loader,
    Moon,
    PlugZap,
    Save,
    SunMoon,
    Trash2,
    Unplug,
    User,
    Workflow,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useForm, usePage } from '@inertiajs/react';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { PageProps } from '@/types/types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { FacebookIcon } from '@/components/icon/Facebook';
import { GoogleIcon } from '@/components/icon/Google';
import { ModeToggle } from '@/components/mode-toggle';

interface UserProps {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    gender: 'male' | 'female' | 'other' | null;
    country: string | null;
    city: string | null;
    zip: string | null;
    address: string | null;
    company_logo: string | null;
    company_name: string | null;
    company_type: string | null;
    company_address: string | null;
    created_at: string;
    google_id?: any;
    facebook_id?: any;
}

interface Country {
    label: string;
    value: string | null;
}
interface CountryProps {
    country: Country[];
}

export default function account({
    user,
    country,
    tab,
}: {
    user: UserProps;
    country: CountryProps[];
    tab?: string;
}) {
    const { name: appName } = usePage<PageProps>().props;
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
    const [showPassword, setShowPassword] = useState(false);

    // tab activity
    const [activeTab, setActiveTab] = useState<string>('profile');
    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    // personal info
    const personalInfoForm = useForm({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        country: user?.country || '',
        city: user?.city || '',
        gender: user?.gender || '',
        zip: user?.zip || '',
        address: user?.address || '',
        avatar: null as File | null,
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
    const handlePersonalInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        personalInfoForm.post(route('app.account.personal'), {
            preserveScroll: true,
        });
    };

    // security
    const securityForm = useForm({
        new_password: '',
        confirmed_password: '',
    });
    const handleSecurity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        securityForm.post(route('app.account.security'), {
            preserveScroll: true,
            onSuccess: () => {
                securityForm.reset();
            },
        });
    };

    // company
    const companyInfoForm = useForm({
        company_logo: null as File | null,
        company_name: user?.company_name || '',
        company_type: user?.company_type || '',
        company_address: user?.company_address || '',
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
    const handleCompany = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        companyInfoForm.post(route('app.account.company'), {
            preserveScroll: true,
        });
    };

    // danger
    const [showConfirmModel, setShowConfirmModel] = useState(false);
    const dangerForm = useForm({
        password: '',
    });
    const handleDanger = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dangerForm.post(route('app.account.danger'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowConfirmModel(false);
            },
            onError: () => {
                setShowConfirmModel(false);
            },
        });
    };
    return (
        <CustomerLayout>
            <PageHeader
                title="Settings"
                subtitle="Manage your account and workspace preferences."
            />

            <Tabs
                defaultValue={activeTab}
                onValueChange={handleTabChange}
                className="mt-2 w-full flex-col md:mt-6 md:flex-row"
                orientation="vertical"
            >
                <TabsList
                    variant="default"
                    className="w-full space-y-2 bg-transparent md:w-50"
                >
                    <TabsTrigger value="profile" className="py-1.5">
                        <User
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="py-1.5">
                        <FingerprintPattern
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="company" className="py-1.5">
                        <Building2
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Company
                    </TabsTrigger>
                    <TabsTrigger value="connect" className="py-1.5">
                        <Workflow
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Connect
                    </TabsTrigger>
                    <TabsTrigger value="theme" className="py-1.5">
                        <SunMoon
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Appearance
                    </TabsTrigger>
                    <TabsTrigger
                        value="danger"
                        className="py-1.5 text-destructive"
                    >
                        <CircleX
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Danger
                    </TabsTrigger>
                </TabsList>

                {/* for profile */}
                <TabsContent value="profile" className="max-w-170 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Profile for {user.name}</CardTitle>
                            <CardDescription>
                                Complete your profile details to personalize
                                your experience and get the most out of your
                                VesselFinder workspace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <form
                                onSubmit={handlePersonalInfo}
                                method="post"
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
                                                    `/storage/${user?.avatar}` ||
                                                    ''
                                                }
                                                alt={user?.name || 'Avatar'}
                                            />
                                            <AvatarFallback>
                                                {user?.name
                                                    ?.slice(0, 2)
                                                    .toLocaleUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="rounded-lg bg-primary dark:bg-background px-3 py-1.5 font-normal text-white dark:text-foreground">
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
                                            !!personalInfoForm.errors.name
                                        }
                                    >
                                        <FieldLabel>Name*</FieldLabel>
                                        <Input
                                            type="text"
                                            placeholder="Enter your name"
                                            value={personalInfoForm.data.name}
                                            aria-invalid={
                                                !!personalInfoForm.errors.name
                                            }
                                            onChange={(e) =>
                                                personalInfoForm.setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            inputSize="sm"
                                        />
                                        <FieldDescription className="text-destructive">
                                            {personalInfoForm.errors.name}
                                        </FieldDescription>
                                    </Field>
                                    <Field
                                        data-invalid={
                                            !!personalInfoForm.errors.phone
                                        }
                                    >
                                        <FieldLabel>Phone*</FieldLabel>
                                        <Input
                                            type="tel"
                                            placeholder="Enter your name"
                                            value={personalInfoForm.data.phone}
                                            aria-invalid={
                                                !!personalInfoForm.errors.phone
                                            }
                                            onChange={(e) =>
                                                personalInfoForm.setData(
                                                    'phone',
                                                    e.target.value,
                                                )
                                            }
                                            inputSize="sm"
                                        />
                                        <FieldDescription className="text-destructive">
                                            {personalInfoForm.errors.phone}
                                        </FieldDescription>
                                    </Field>
                                </div>

                                <Field
                                    data-invalid={
                                        !!personalInfoForm.errors.email
                                    }
                                >
                                    <FieldLabel>Email*</FieldLabel>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={personalInfoForm.data.email}
                                        aria-invalid={
                                            !!personalInfoForm.errors.email
                                        }
                                        onChange={(e) =>
                                            personalInfoForm.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        inputSize="sm"
                                    />
                                    <FieldDescription className="text-destructive">
                                        {personalInfoForm.errors.email}
                                    </FieldDescription>
                                </Field>

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <Field
                                        data-invalid={
                                            !!personalInfoForm.errors.country
                                        }
                                    >
                                        <FieldLabel>Country*</FieldLabel>

                                        <Combobox
                                            items={country}
                                            onValueChange={(value) =>
                                                personalInfoForm.setData(
                                                    'country',
                                                    (value as string | null) ??
                                                        '',
                                                )
                                            }
                                        >
                                            <ComboboxInput
                                                placeholder="Select a country"
                                                showClear
                                                aria-invalid={
                                                    !!personalInfoForm.errors
                                                        .country
                                                }
                                                className="h-10 rounded-xl"
                                                value={
                                                    personalInfoForm.data
                                                        .country
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
                                                            value={items.value}
                                                        >
                                                            {items.label}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>

                                        <FieldDescription className="text-destructive">
                                            {personalInfoForm.errors.country}
                                        </FieldDescription>
                                    </Field>
                                    <Field
                                        data-invalid={
                                            !!personalInfoForm.errors.city
                                        }
                                    >
                                        <FieldLabel>City*</FieldLabel>

                                        <Input
                                            type="text"
                                            placeholder="Enter your city"
                                            value={personalInfoForm.data.city}
                                            aria-invalid={
                                                !!personalInfoForm.errors.city
                                            }
                                            onChange={(e) =>
                                                personalInfoForm.setData(
                                                    'city',
                                                    e.target.value,
                                                )
                                            }
                                            inputSize="sm"
                                        />
                                        <FieldDescription className="text-destructive">
                                            {personalInfoForm.errors.city}
                                        </FieldDescription>
                                    </Field>
                                </div>

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <Field
                                        data-invalid={
                                            !!personalInfoForm.errors.zip
                                        }
                                    >
                                        <FieldLabel>Zip code*</FieldLabel>

                                        <Input
                                            type="text"
                                            placeholder="Enter your zip"
                                            value={personalInfoForm.data.zip}
                                            aria-invalid={
                                                !!personalInfoForm.errors.zip
                                            }
                                            onChange={(e) =>
                                                personalInfoForm.setData(
                                                    'zip',
                                                    e.target.value,
                                                )
                                            }
                                            inputSize="sm"
                                        />
                                        <FieldDescription className="text-destructive">
                                            {personalInfoForm.errors.zip}
                                        </FieldDescription>
                                    </Field>
                                    <Field
                                        data-invalid={
                                            !!personalInfoForm.errors.gender
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
                                                personalInfoForm.data.gender
                                            }
                                        >
                                            <ComboboxInput
                                                placeholder="Select gender"
                                                showClear
                                                aria-invalid={
                                                    !!personalInfoForm.errors
                                                        .gender
                                                }
                                                className="h-10 rounded-xl"
                                            />
                                            <ComboboxContent>
                                                <ComboboxEmpty>
                                                    No items found.
                                                </ComboboxEmpty>
                                                <ComboboxList>
                                                    {(items, i) => (
                                                        <ComboboxItem
                                                            key={i}
                                                            value={items.value}
                                                        >
                                                            {items.label}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>

                                        <FieldDescription className="text-destructive">
                                            {personalInfoForm.errors.gender}
                                        </FieldDescription>
                                    </Field>
                                </div>

                                <Field
                                    data-invalid={
                                        !!personalInfoForm.errors.address
                                    }
                                >
                                    <FieldLabel>Address*</FieldLabel>
                                    <Textarea
                                        placeholder="Enter your address"
                                        value={personalInfoForm.data.address}
                                        aria-invalid={
                                            !!personalInfoForm.errors.address
                                        }
                                        onChange={(e) =>
                                            personalInfoForm.setData(
                                                'address',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <FieldDescription className="text-destructive">
                                        {personalInfoForm.errors.address}
                                    </FieldDescription>
                                </Field>

                                <Button
                                    size="lg"
                                    type="submit"
                                    disabled={personalInfoForm.processing}
                                >
                                    {personalInfoForm.processing ? (
                                        <Loader className="size-4 animate-spin" />
                                    ) : (
                                        <Save className="size-4" />
                                    )}
                                    {personalInfoForm.processing
                                        ? 'Saving..'
                                        : 'Save now'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* for security */}
                <TabsContent value="security" className="max-w-170 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Secure your {appName} account</CardTitle>
                            <CardDescription>
                                Strengthen your account security by setting up
                                your security preferences and protecting your
                                {appName} workspace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <form
                                onSubmit={handleSecurity}
                                method="post"
                                className="space-y-3"
                            >
                                <Field
                                    data-invalid={
                                        !!securityForm.errors.new_password
                                    }
                                >
                                    <FieldLabel>New password*</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            value={
                                                securityForm.data.new_password
                                            }
                                            aria-invalid={
                                                !!securityForm.errors
                                                    .new_password
                                            }
                                            onChange={(e) =>
                                                securityForm.setData(
                                                    'new_password',
                                                    e.target.value,
                                                )
                                            }
                                            inputSize="sm"
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
                                    <FieldDescription className="text-destructive">
                                        {securityForm.errors.new_password}
                                    </FieldDescription>
                                </Field>
                                <Field
                                    data-invalid={
                                        !!securityForm.errors.confirmed_password
                                    }
                                >
                                    <FieldLabel>Confirm password*</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            value={
                                                securityForm.data
                                                    .confirmed_password
                                            }
                                            aria-invalid={
                                                !!securityForm.errors
                                                    .confirmed_password
                                            }
                                            onChange={(e) =>
                                                securityForm.setData(
                                                    'confirmed_password',
                                                    e.target.value,
                                                )
                                            }
                                            inputSize="sm"
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
                                    <FieldDescription className="text-destructive">
                                        {securityForm.errors.confirmed_password}
                                    </FieldDescription>
                                </Field>

                                <Button
                                    size="lg"
                                    type="submit"
                                    disabled={
                                        securityForm.processing ||
                                        securityForm?.data.new_password == '' ||
                                        securityForm?.data
                                            ?.confirmed_password == ''
                                    }
                                >
                                    {securityForm.processing ? (
                                        <Loader className="size-4 animate-spin" />
                                    ) : (
                                        <FingerprintPattern className="size-4" />
                                    )}
                                    {securityForm.processing
                                        ? 'Changing..'
                                        : 'Change now'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* company */}
                <TabsContent value="company" className="max-w-170 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Set up your company profile</CardTitle>
                            <CardDescription>
                                Add your company information to personalize your{' '}
                                {appName} workspace and unlock a more tailored
                                experience.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <form
                                onSubmit={handleCompany}
                                method="post"
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
                                                    `/storage/${user?.company_logo}` ||
                                                    ''
                                                }
                                                alt={
                                                    companyInfoForm?.data
                                                        .company_name ||
                                                    'Company logo'
                                                }
                                            />
                                            <AvatarFallback>
                                                {companyInfoForm?.data.company_name
                                                    ?.slice(0, 2)
                                                    .toLocaleUpperCase() ||
                                                    user?.name
                                                        ?.slice(0, 2)
                                                        .toLocaleUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="rounded-lg bg-primary dark:bg-background px-3 py-1.5 font-normal text-white dark:text-foreground">
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
                                        {companyInfoForm.errors.company_logo}
                                    </FieldDescription>
                                </Label>

                                <Field
                                    data-invalid={
                                        !!companyInfoForm.errors.company_name
                                    }
                                >
                                    <FieldLabel>Company Name</FieldLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter your company name"
                                        value={
                                            companyInfoForm.data.company_name
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
                                        {companyInfoForm.errors.company_name}
                                    </FieldDescription>
                                </Field>

                                <Field
                                    data-invalid={
                                        !!companyInfoForm.errors.company_type
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
                                                (value as string | null) ?? '',
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
                                                companyInfoForm.data
                                                    .company_type
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
                                                        value={items.value}
                                                    >
                                                        {items.label}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                    <FieldDescription className="text-destructive">
                                        {companyInfoForm.errors.company_type}
                                    </FieldDescription>
                                </Field>

                                <Field
                                    data-invalid={
                                        !!companyInfoForm.errors.company_address
                                    }
                                >
                                    <FieldLabel>Address*</FieldLabel>
                                    <Textarea
                                        placeholder="Enter your address"
                                        value={
                                            companyInfoForm.data.company_address
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
                                        {companyInfoForm.errors.company_address}
                                    </FieldDescription>
                                </Field>

                                <Button
                                    size="lg"
                                    type="submit"
                                    disabled={companyInfoForm.processing}
                                >
                                    {companyInfoForm.processing ? (
                                        <Loader className="size-4 animate-spin" />
                                    ) : (
                                        <Save className="size-4" />
                                    )}
                                    {companyInfoForm.processing
                                        ? 'Saving..'
                                        : 'Save now'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Connect */}
                <TabsContent value="connect" className="max-w-170 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Connect your social accounts</CardTitle>
                            <CardDescription>
                                Link your Google and Facebook accounts for
                                faster, easier, and more secure sign-ins to your{' '}
                                {appName} workspace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            {/* facebook */}
                            <div className="flex items-center justify-between rounded-t-xl border border-border bg-card p-4 transition-colors hover:bg-muted/40">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background">
                                        <FacebookIcon className="size-6" />
                                    </div>

                                    <div>
                                        <h1 className="text-sm font-medium text-foreground">
                                            Facebook
                                        </h1>
                                        <p className="text-xs text-muted-foreground">
                                            Connect your Facebook account
                                        </p>
                                    </div>
                                </div>

                                {!user?.facebook_id ? (
                                    <a
                                        href={route(
                                            'app.account.connect',
                                            'facebook',
                                        )}
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-lg"
                                        >
                                            <PlugZap className="size-3" />
                                            <span>Connect</span>
                                        </Button>
                                    </a>
                                ) : (
                                    <Link
                                        href={route(
                                            'app.account.social.remove',
                                            { type: 'facebook' },
                                        )}
                                    >
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="rounded-lg"
                                        >
                                            <Unplug className="size-3" />
                                            <span>Disconnect</span>
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            {/* google */}
                            <div className="flex items-center justify-between rounded-b-xl border border-t-0 border-border bg-card p-4 transition-colors hover:bg-muted/40">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background">
                                        <GoogleIcon className="size-6" />
                                    </div>

                                    <div>
                                        <h1 className="text-sm font-medium text-foreground">
                                            Google
                                        </h1>
                                        <p className="text-xs text-muted-foreground">
                                            Connect your Google account
                                        </p>
                                    </div>
                                </div>

                                {!user?.google_id ? (
                                    <a
                                        href={route(
                                            'app.account.connect',
                                            'google',
                                        )}
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-lg"
                                        >
                                            <PlugZap className="size-3" />
                                            <span>Connect</span>
                                        </Button>
                                    </a>
                                ) : (
                                    <Link
                                        href={route(
                                            'app.account.social.remove',
                                            {
                                                type: 'google',
                                            },
                                        )}
                                    >
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="rounded-lg"
                                        >
                                            <Unplug className="size-3" />
                                            <span>Disconnect</span>
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* theme */}
                <TabsContent value="theme" className="max-w-170 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Customize your appearance</CardTitle>
                            <CardDescription>
                                Personalize your {appName} workspace with your
                                preferred theme and appearance settings for a
                                more comfortable experience.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <ModeToggle/>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* for danger */}
                <TabsContent value="danger" className="max-w-170 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Danger Zone</CardTitle>
                            <CardDescription>
                                Permanently delete your {appName} account and
                                all associated data. This action cannot be
                                undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <div className="space-y-3">
                                <Field
                                    data-invalid={!!dangerForm.errors.password}
                                >
                                    <FieldLabel>Password*</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            value={dangerForm.data.password}
                                            aria-invalid={
                                                !!dangerForm.errors.password
                                            }
                                            onChange={(e) =>
                                                dangerForm.setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            inputSize="sm"
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
                                    <FieldDescription className="text-destructive">
                                        {dangerForm.errors.password}
                                    </FieldDescription>
                                </Field>

                                <Button
                                    size="lg"
                                    disabled={
                                        dangerForm.processing ||
                                        dangerForm?.data.password == ''
                                    }
                                    onClick={() => setShowConfirmModel(true)}
                                    variant="destructive"
                                >
                                    Delete account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* alert dialog */}
            <AlertDialog open={showConfirmModel}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="border-0 bg-transparent">
                        <AlertDialogCancel
                            onClick={() => setShowConfirmModel(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={
                                dangerForm.processing ||
                                dangerForm?.data.password == ''
                            }
                            onClick={handleDanger}
                        >
                            {dangerForm.processing ? (
                                <Loader className="size-3.5 animate-spin" />
                            ) : (
                                <Trash2 className="size-3.5" />
                            )}
                            {dangerForm.processing
                                ? 'Deleting..'
                                : 'Delete account'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CustomerLayout>
    );
}
