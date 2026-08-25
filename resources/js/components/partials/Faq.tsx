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

interface FaqItem {
    id: string;
    question: string;
    answer: string;
    date?: string;
}

interface FaqProps {
    title?: React.ReactNode;
    faqs?: FaqItem[];
    className?: string;
}

export default function Faq({
    faqs = [
        {
            id: 'item-1',
            question: 'What technologies do you specialize in?',
            answer: 'We specialize in modern frontend and full-stack technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, Hono, and scalable design systems. Our team also works with real-time applications, authentication systems, and cloud deployments.',
        },
        {
            id: 'item-2',
            question: 'Can you build fully custom base-ui components?',
            answer: 'Yes. We design and develop fully custom base-ui systems tailored to your product requirements. From dashboards and landing pages to complex SaaS interfaces, every component is built with accessibility, responsiveness, and scalability in mind.',
            date: '11 May, 2026',
        },
        {
            id: 'item-3',
            question: 'Do you work with startups and early-stage products?',
            answer: 'Absolutely. We frequently collaborate with startups to help validate ideas, design MVPs, and launch production-ready applications quickly. We focus on fast iteration without compromising code quality or user experience.',
        },
        {
            id: 'item-4',
            question: 'How do you handle project communication?',
            answer: 'We maintain clear and transparent communication through regular updates, progress tracking, and collaborative feedback cycles. Depending on the project, we typically use Slack, Discord, Linear, Notion, or email for coordination.',
        },
        {
            id: 'item-5',
            question: 'Can existing applications be redesigned or optimized?',
            answer: 'Yes. We can modernize outdated interfaces, improve UX flows, optimize frontend performance, and refactor codebases for better maintainability. Our process includes design audits, accessibility improvements, and performance analysis.',
        },
        {
            id: 'item-6',
            question: 'Do you provide ongoing maintenance and support?',
            answer: 'We offer ongoing support for bug fixes, feature development, infrastructure improvements, and long-term scaling. Whether you need occasional updates or a dedicated development partner, we can tailor support to your workflow.',
        },
    ],
    className,
}: FaqProps) {
    return (
        <section
            className={cn('w-full', className)}
        >
            <Accordion className="w-full">
                {faqs.map((faq, i) => (
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

                                {faq.date && (
                                    <div className="text-sm font-medium text-muted-foreground/70">
                                        {faq.date}
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                ))}
            </Accordion>
        </section>
    );
}
