import React, { ReactElement, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PageData {
    children: ReactElement;
    title?: string;
    subtitle?: string;
    isCancel?: boolean;
    callBack: () => void;
}

export default function Confirmation({
    children,
    title,
    subtitle,
    isCancel = true,
    callBack,
}: PageData) {
    const [open, setOpen] = useState(false);

    const handleContinue = async () => {
        await callBack();
        setOpen(false);
    };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger render={children}>
                Show Dialog
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title || 'Are you absolutely sure?'}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {subtitle ||
                            'This action cannot be undone. This will permanently delete your account from our servers.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    {isCancel && <AlertDialogCancel>Cancel</AlertDialogCancel>}

                    <AlertDialogAction onClick={handleContinue}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
