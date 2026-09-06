import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types/types';

interface FaqProps {
    className?: string;
}

type Faq = {
    id: number;
    question: string;
    answer: string;
};

type FaqData = {
    faqData: Faq[];
};

export default function Faq({ className }: FaqProps) {
    const { faqData } = usePage<PageProps & FaqData>().props;

    return (
        <section className={cn('w-full', className)}>
            <Accordion className="w-full">
                {faqData.map((faq, i) => (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            filter: 'blur(5px)',
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0)',
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeInOut',
                            delay: i * 0.1,
                        }}
                        viewport={{ once: true }}
                        key={i}
                    >
                        <AccordionItem
                            key={faq.id}
                            className="border-b border-border"
                        >
                            <AccordionTrigger className="group flex items-center py-5 hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden!">
                                <span className="pr-4 text-left text-base font-medium text-foreground md:text-lg">
                                    {faq.question}
                                </span>

                                <div className="ml-auto flex shrink-0 items-center justify-center text-muted-foreground">
                                    <FaPlus className="block h-4 w-4 group-data-[state=open]:hidden" />
                                    <FaMinus className="hidden h-4 w-4 group-data-[state=open]:block" />
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="pt-0 pb-5">
                                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                    {faq.answer}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                ))}
            </Accordion>
        </section>
    );
}
