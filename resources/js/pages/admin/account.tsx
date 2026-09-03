import PageHeader from '@/components/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Eye,
    EyeOff,
    FingerprintPattern,
    Loader,
    Save,
    SunMoon,
    User,
} from 'lucide-react';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types/types';
import { ModeToggle } from '@/components/mode-toggle';

interface SsrData {
    name: string;
    email: string;
    avatar?: string | '';
}

export default function account({ data: initData }: { data: SsrData }) {
    const { name: appName } = usePage<PageProps>().props;
    const [showPassword, setShowPassword] = useState(false);

    // tab activity
    const [activeTab, setActiveTab] = useState<string>('profile');
    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    // personal info
    const personalInfoForm = useForm({
        name: initData?.name || '',
        email: initData?.email || '',
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
        personalInfoForm.post(route('admin.account.personal'), {
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
        securityForm.post(route('admin.account.security'), {
            preserveScroll: true,
            onSuccess: () => {
                securityForm.reset();
            },
        });
    };
    return (
        <AdminLayout title="Account">
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
                    <TabsTrigger value="theme" className="py-1.5">
                        <SunMoon
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Appearance
                    </TabsTrigger>
                </TabsList>

                {/* for profile */}
                <TabsContent value="profile" className="max-w-170 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Profile for {initData.name}</CardTitle>
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
                                                    `/storage/${initData?.avatar}` ||
                                                    ''
                                                }
                                                alt={initData?.name || 'Avatar'}
                                            />
                                            <AvatarFallback>
                                                {initData?.name
                                                    ?.slice(0, 2)
                                                    .toLocaleUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="rounded-lg bg-primary px-3 py-1.5 font-normal text-white dark:bg-background dark:text-foreground">
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
                            <ModeToggle />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}
