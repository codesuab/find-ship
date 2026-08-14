import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { motion } from 'motion/react'

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
    title = (
        <>
            Got questions about FindShip?
            <br className="hidden sm:block" />
            We've got answers.
        </>
    ),
    faqs = [
        {
            id: "item-1",
            question: "What technologies do you specialize in?",
            answer:
                "We specialize in modern frontend and full-stack technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, Hono, and scalable design systems. Our team also works with real-time applications, authentication systems, and cloud deployments.",
        },
        {
            id: "item-2",
            question: "Can you build fully custom base-ui components?",
            answer:
                "Yes. We design and develop fully custom base-ui systems tailored to your product requirements. From dashboards and landing pages to complex SaaS interfaces, every component is built with accessibility, responsiveness, and scalability in mind.",
            date: "11 May, 2026",
        },
        {
            id: "item-3",
            question: "Do you work with startups and early-stage products?",
            answer:
                "Absolutely. We frequently collaborate with startups to help validate ideas, design MVPs, and launch production-ready applications quickly. We focus on fast iteration without compromising code quality or user experience.",
        },
        {
            id: "item-4",
            question: "How do you handle project communication?",
            answer:
                "We maintain clear and transparent communication through regular updates, progress tracking, and collaborative feedback cycles. Depending on the project, we typically use Slack, Discord, Linear, Notion, or email for coordination.",
        },
        {
            id: "item-5",
            question: "Can existing applications be redesigned or optimized?",
            answer:
                "Yes. We can modernize outdated interfaces, improve UX flows, optimize frontend performance, and refactor codebases for better maintainability. Our process includes design audits, accessibility improvements, and performance analysis.",
        },
        {
            id: "item-6",
            question: "Do you provide ongoing maintenance and support?",
            answer:
                "We offer ongoing support for bug fixes, feature development, infrastructure improvements, and long-term scaling. Whether you need occasional updates or a dedicated development partner, we can tailor support to your workflow.",
        },
    ],
    className,
}: FaqProps) {
    return (
        <section
            className={cn(
                "mx-auto w-full max-w-4xl px-4 pb-25",
                className
            )}
        >
            <div className="mb-12 flex flex-col items-center text-center">
                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 10,
                        filter: "blur(10px)",
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    className="text-gradient-up max-w-2xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl md:leading-tight">
                    {title}
                </motion.h2>
            </div>

            <Accordion className="w-full gap-2">
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
                            filter: 'blur(0)'
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
                            className="bg-muted/50 rounded-xl px-6"
                        >
                            <AccordionTrigger className="group flex items-center py-6 hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden!">
                                <span className="text-foreground pr-4 text-left text-base font-medium md:text-lg">
                                    {faq.question}
                                </span>

                                <div className="text-muted-foreground ml-auto flex shrink-0 items-center justify-center">
                                    <FaPlus className="block h-4 w-4 group-data-[state=open]:hidden" />
                                    <FaMinus className="hidden h-4 w-4 group-data-[state=open]:block" />
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="pt-0 pb-6">
                                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                                    {faq.answer}
                                </p>

                                {faq.date && (
                                    <div className="text-muted-foreground/70 mt-4 text-sm font-medium">
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