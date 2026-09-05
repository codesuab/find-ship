import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import Can from '@/components/Can';

interface SMTPData {
    id: number | null;
    driver: string | '';
    host: string | '';
    port: number | '';
    username: string | '';
    password: string | '';
    encryption: 'tls' | 'ssl';
    from_address: string | '';
    from_name: string | '';
}

interface PageData {
    data: SMTPData;
}

export default function smtp({ data: initData }: PageData) {
    const { data, setData, processing, post, errors } = useForm<SMTPData>({
        id: initData.id || null,
        driver: initData.driver || '',
        host: initData.host || '',
        port: initData.port || '',
        username: initData.username || '',
        password: initData.password || '',
        encryption: initData.encryption || 'tls',
        from_address: initData.from_address || '',
        from_name: initData.from_name || '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.smtp.store'), {
            preserveScroll: true,
        });
    };

    // static data
    const encryptionItems = [
        { label: 'Tls', value: 'tls' },
        { label: 'Ssl', value: 'ssl' },
    ];
    return (
        <AdminLayout title="SMTP Configure">
            <PageHeader
                title="SMTP Configuration"
                subtitle="Configure your email server settings"
            />

            <Card>
                <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field>
                        <Label>Driver*</Label>
                        <Input
                            type="text"
                            value={data.driver}
                            onChange={(e) => setData('driver', e.target.value)}
                            inputSize="sm"
                        />
                        {errors.driver && (
                            <FieldDescription className="text-destructive">
                                {errors.driver}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <Label>Host*</Label>
                        <Input
                            type="text"
                            value={data.host}
                            onChange={(e) => setData('host', e.target.value)}
                            inputSize="sm"
                        />
                        {errors.host && (
                            <FieldDescription className="text-destructive">
                                {errors.host}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <Label>Port*</Label>
                        <Input
                            type="number"
                            value={data.port}
                            onChange={(e) =>
                                setData('port', Number(e.target.value))
                            }
                            inputSize="sm"
                        />
                        {errors.port && (
                            <FieldDescription className="text-destructive">
                                {errors.port}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <Label>Username*</Label>
                        <Input
                            type="text"
                            value={data.username}
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
                            inputSize="sm"
                        />
                        {errors.username && (
                            <FieldDescription className="text-destructive">
                                {errors.username}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <Label>Password*</Label>
                        <Input
                            type="text"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            inputSize="sm"
                        />
                        {errors.password && (
                            <FieldDescription className="text-destructive">
                                {errors.password}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <Label>Encryption*</Label>
                        <Select
                            items={encryptionItems}
                            defaultValue={data.encryption}
                            onValueChange={(value) =>
                                setData('encryption', value || 'tls')
                            }
                        >
                            <SelectTrigger size="md">
                                <SelectValue placeholder="Encryption" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {encryptionItems.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.encryption && (
                            <FieldDescription className="text-destructive">
                                {errors.encryption}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <Label>From Address*</Label>
                        <Input
                            type="text"
                            value={data.from_address}
                            onChange={(e) =>
                                setData('from_address', e.target.value)
                            }
                            inputSize="sm"
                        />
                        {errors.from_address && (
                            <FieldDescription className="text-destructive">
                                {errors.from_address}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <Label>Company Name*</Label>
                        <Input
                            type="text"
                            value={data.from_name}
                            onChange={(e) =>
                                setData('from_name', e.target.value)
                            }
                            inputSize="sm"
                        />
                        {errors.from_name && (
                            <FieldDescription className="text-destructive">
                                {errors.from_name}
                            </FieldDescription>
                        )}
                    </Field>
                </CardContent>
                <CardFooter>
                    {Can('smtp.update') && (
                        <Button onClick={handleUpdate} disabled={processing}>
                            {processing ? (
                                <Loader className="animate-spin" />
                            ) : (
                                'Save now'
                            )}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </AdminLayout>
    );
}
