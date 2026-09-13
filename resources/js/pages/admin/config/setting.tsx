import PageHeader from '@/components/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import React, { FormEvent, useState } from 'react';
import { CgWebsite } from 'react-icons/cg';
import { AiOutlineApi } from 'react-icons/ai';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useForm } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader, RobotVacuum } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useCopyToClipboard } from '@/hooks/clipcoard';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';

interface apiCall {
    id: number | null;
    in_port?: number;
    expected?: number;
    departure?: number;
    arrival?: number;
}

interface pageProps {
    apiCall: apiCall;
    command: {
        commandSchedule: string;
        commandQueue: string;
    };
}

export default function setting({ apiCall, command }: pageProps) {
    // tab activity
    const [activeTab, setActiveTab] = useState<string>('profile');
    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    // api call
    const ApiCallForm = useForm<apiCall>({
        id: apiCall?.id || null,
        in_port: apiCall?.in_port || 10,
        expected: apiCall?.expected || 10,
        departure: apiCall?.departure || 10,
        arrival: apiCall?.arrival || 10,
    });
    const handleApiCall = (e: FormEvent) => {
        e.preventDefault();
        ApiCallForm.post(route('admin.setting.api.call'), {
            preserveScroll: true,
        });
    };

    // cron
    const { copyToClipboard, isCopied } = useCopyToClipboard();
    return (
        <AdminLayout title="Setting">
            <PageHeader
                title="Settings"
                subtitle="Manage application settings and configuration."
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
                    <TabsTrigger value="site" className="py-1.5">
                        <CgWebsite
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Site Setting
                    </TabsTrigger>
                    <TabsTrigger value="api" className="py-1.5">
                        <AiOutlineApi
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Api Automation
                    </TabsTrigger>
                    <TabsTrigger value="cron" className="py-1.5">
                        <RobotVacuum
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Cron job
                    </TabsTrigger>
                </TabsList>

                {/* for site */}
                <TabsContent value="site" className="max-w-170 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Profile for</CardTitle>
                            <CardDescription>
                                Complete your profile details to personalize
                                your experience and get the most out of your
                                VesselFinder workspace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground"></CardContent>
                    </Card>
                </TabsContent>

                {/* for api */}
                <TabsContent value="api" className="max-w-200 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>API Call Automation</CardTitle>
                            <CardDescription>
                                Configure the automatic country location sync
                                interval and manage scheduled API updates.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            <Table className="table-fixed">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Arrival (day)</TableHead>
                                        <TableHead>Departure (day)</TableHead>
                                        <TableHead>Expected (day)</TableHead>
                                        <TableHead>In Port (day)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Input
                                                inputSize="sm"
                                                value={ApiCallForm.data.arrival}
                                                onChange={(e) =>
                                                    ApiCallForm.setData(
                                                        'arrival',
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                            {ApiCallForm.errors.arrival && (
                                                <p className="mt-3 text-sm text-destructive">
                                                    {ApiCallForm.errors.arrival}
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                inputSize="sm"
                                                value={
                                                    ApiCallForm.data.departure
                                                }
                                                onChange={(e) =>
                                                    ApiCallForm.setData(
                                                        'departure',
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                            {ApiCallForm.errors.departure && (
                                                <p className="mt-3 text-sm text-destructive">
                                                    {
                                                        ApiCallForm.errors
                                                            .departure
                                                    }
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                inputSize="sm"
                                                value={
                                                    ApiCallForm.data.expected
                                                }
                                                onChange={(e) =>
                                                    ApiCallForm.setData(
                                                        'expected',
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                            {ApiCallForm.errors.expected && (
                                                <p className="mt-3 text-sm text-destructive">
                                                    {
                                                        ApiCallForm.errors
                                                            .expected
                                                    }
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                inputSize="sm"
                                                value={ApiCallForm.data.in_port}
                                                onChange={(e) =>
                                                    ApiCallForm.setData(
                                                        'in_port',
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                            {ApiCallForm.errors.in_port && (
                                                <p className="mt-3 text-sm text-destructive">
                                                    {ApiCallForm.errors.in_port}
                                                </p>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <Button
                                onClick={handleApiCall}
                                disabled={ApiCallForm.processing}
                            >
                                {ApiCallForm.processing && (
                                    <Loader className="animate-spin" />
                                )}
                                Update
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* for api */}
                <TabsContent value="cron" className="max-w-200 md:ml-10">
                    <Card className="rounded-xl p-0 ring-0">
                        <CardHeader>
                            <CardTitle>Task Scheduler & Queue</CardTitle>
                            <CardDescription>
                                Manage automated scheduled tasks and background
                                queue processing to keep your application
                                running reliably.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 text-sm text-muted-foreground">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="queue-command">
                                        Queue Worker Command
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            placeholder={command.commandQueue}
                                            readOnly
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                aria-label="Copy"
                                                title="Copy"
                                                size="icon-xs"
                                                onClick={() => {
                                                    copyToClipboard(
                                                        command.commandQueue,
                                                    );
                                                }}
                                            >
                                                {isCopied ? (
                                                    <IconCheck />
                                                ) : (
                                                    <IconCopy />
                                                )}
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription>
                                        The Artisan command used to process
                                        queued background jobs.
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="queue-command">
                                        Schedule Cron Command
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            placeholder={command.commandSchedule}
                                            readOnly
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                aria-label="Copy"
                                                title="Copy"
                                                size="icon-xs"
                                                onClick={() => {
                                                    copyToClipboard(
                                                        command.commandSchedule,
                                                    );
                                                }}
                                            >
                                                {isCopied ? (
                                                    <IconCheck />
                                                ) : (
                                                    <IconCopy />
                                                )}
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription>
                                        Runs Laravel scheduled tasks automatically according to your application schedule.
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}
