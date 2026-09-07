import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AdminLayout from '@/Layouts/AdminLayout';
import { Loader, MoveUpRight, Pen, Trash, X } from 'lucide-react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Field, FieldDescription } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm } from '@inertiajs/react';
import Confirmation from '@/components/Confirmation';
import Can from '@/components/Can';

// table data
interface faqData {
    id: number;
    question: string;
    answer: string;
}

// page data
interface PageData {
    faqData: faqData[];
}

// form interface
interface FaqFormData {
    id: number | null;
    question: string;
    answer: string;
}

export default function index({ faqData }: PageData) {
    const isMobile = useIsMobile();
    const swipeDirection = isMobile ? 'down' : 'right';
    const [modalOpen, setModalOpen] = useState<string | null>(null);

    // faq
    const faqForm = useForm<FaqFormData>({
        id: null,
        question: '',
        answer: '',
    });
    const submitFaq = (e: React.FormEvent) => {
        e.preventDefault();
        faqForm.post(route('admin.frontend.faq.store'), {
            preserveScroll: true,
            onSuccess: () => {
                faqForm.reset();
            },
        });
    };
    return (
        <AdminLayout title="Frontend configures">
            <PageHeader
                title="Frontend"
                subtitle="Manage your website appearance and frontend settings."
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <Card
                    className="group cursor-pointer"
                    onClick={() => setModalOpen('faq')}
                >
                    <CardHeader className="relative">
                        <CardTitle>FAQs</CardTitle>
                        <CardDescription>
                            Manage frequently asked questions.
                        </CardDescription>

                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute top-0 right-4 duration-300 group-hover:rotate-45 group-hover:rounded-full"
                        >
                            <MoveUpRight />
                        </Button>
                    </CardHeader>
                </Card>
            </div>

            {/* faq */}
            <Drawer
                open={Boolean(modalOpen == 'faq')}
                swipeDirection={swipeDirection}
            >
                <DrawerContent className="pb-4">
                    <DrawerHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
                        <div>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>
                                This action cannot be undone.
                            </DrawerDescription>
                        </div>

                        <Button
                            onClick={() => setModalOpen(null)}
                            size="icon"
                            variant="outline"
                        >
                            <X />
                        </Button>
                    </DrawerHeader>
                    {(Can('ui.create') || Can('ui.update')) && (
                        <div className="space-y-3 p-4">
                            <Field>
                                <Label>Question*</Label>
                                <Input
                                    type="text"
                                    inputSize="sm"
                                    value={faqForm.data.question}
                                    onChange={(e) =>
                                        faqForm.setData(
                                            'question',
                                            e.target.value,
                                        )
                                    }
                                />
                                <FieldDescription className="text-destructive">
                                    {faqForm.errors.question}
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Label>Question*</Label>
                                <Textarea
                                    value={faqForm.data.answer}
                                    onChange={(e) =>
                                        faqForm.setData(
                                            'answer',
                                            e.target.value,
                                        )
                                    }
                                />
                                <FieldDescription className="text-destructive">
                                    {faqForm.errors.answer}
                                </FieldDescription>
                            </Field>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <Button
                                    onClick={submitFaq}
                                    disabled={faqForm.processing}
                                    className="w-full"
                                >
                                    {faqForm.processing && (
                                        <Loader className="animate-spin" />
                                    )}{' '}
                                    Save
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => faqForm.reset()}
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                    )}
                    <div className="no-scrollbar space-y-2 overflow-y-auto p-4">
                        {faqData.map((val, i) => (
                            <Card key={i}>
                                <CardContent>
                                    <CardTitle>{val.question}</CardTitle>
                                    <CardDescription>
                                        {val.answer?.slice(0, 50)}..
                                    </CardDescription>
                                    <div className="mt-2 flex items-center justify-end gap-2">
                                        {Can('ui.update') && (
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => {
                                                    faqForm.setData(
                                                        'id',
                                                        val.id,
                                                    );
                                                    faqForm.setData(
                                                        'answer',
                                                        val.answer,
                                                    );
                                                    faqForm.setData(
                                                        'question',
                                                        val.question,
                                                    );
                                                }}
                                            >
                                                <Pen />
                                            </Button>
                                        )}
                                        {Can('ui.delete') && (
                                            <Confirmation
                                                callBack={() =>
                                                    router.delete(
                                                        route(
                                                            'admin.frontend.faq.delete',
                                                            {
                                                                id: val.id,
                                                            },
                                                        ),
                                                    )
                                                }
                                            >
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                >
                                                    <Trash />
                                                </Button>
                                            </Confirmation>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </DrawerContent>
            </Drawer>
        </AdminLayout>
    );
}
