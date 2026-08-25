import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import PageHeader from '@/components/partials/PageHeader';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import SlideUpButton from '@/components/slideup-button';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaEnvelope, FaHeadset } from 'react-icons/fa6';
import { motion, Variants } from 'motion/react';
import SectionHeader from '@/components/SectionHeader';
import CableAnimatedIcon from '@/components/icon/CableAnimatedIcon';

export default function contact() {
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };
    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 18,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 24,
            },
        },
    };

    // subject
    const items = [
        { label: 'Select a Type', value: null },
        { label: 'Payment', value: 'payment' },
        { label: 'Technical', value: 'technical' },
        { label: 'Application', value: 'application' },
        { label: 'Bug or Issue', value: 'issue' },
        { label: 'Custom', value: 'custom' },
    ];
    return (
        <AppLayout key="contact">
            <Head>
                <title>Get In Touch</title>
            </Head>

            {/* content */}
            <PageHeader
                title="Get In Touch"
                subtitle="Connect with our team for expert vessel tracking support, reliable maritime data, and solutions tailored to your operational needs."
            />

            {/* form */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container pb-20"
            >
                <div className="mx-auto mt-20 grid max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
                    <motion.div
                        variants={itemVariants}
                        viewport={{ amount: 0.2 }}
                    >
                        <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <Input type="text" placeholder="Sahab" />
                        </Field>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        viewport={{ amount: 0.2 }}
                    >
                        <Field>
                            <FieldLabel>Last Name</FieldLabel>
                            <Input type="text" placeholder="Ahmad" />
                        </Field>
                    </motion.div>
                    <div className="col-span-1 space-y-4 md:col-span-2">
                        <motion.div
                            variants={itemVariants}
                            viewport={{ amount: 0.2 }}
                        >
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    placeholder="Type your email address"
                                />
                            </Field>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            viewport={{ amount: 0.2 }}
                        >
                            <Field>
                                <FieldLabel>Phone</FieldLabel>
                                <Input
                                    type="tel"
                                    placeholder="Type your phone"
                                />
                            </Field>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            viewport={{ amount: 0.2 }}
                        >
                            <Field>
                                <FieldLabel>Need our support?</FieldLabel>
                                <Select items={items}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            {items.map((item) => (
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
                            </Field>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            viewport={{ amount: 0.2 }}
                        >
                            <Field>
                                <FieldLabel>Message</FieldLabel>
                                <Textarea
                                    placeholder="Type your message here."
                                    className="min-h-30"
                                />
                            </Field>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            viewport={{ amount: 0.2 }}
                        >
                            <SlideUpButton className="w-full" variant="base">
                                Send Message
                            </SlideUpButton>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* contact info */}
            <section className="pb-25 mt-14">
                <div className="mx-auto max-w-7xl px-4">
                    <SectionHeader
                        title="Build smarter together"
                        subtitle="Have questions about our vessel tracking platform,
                            partnerships, or features? Our team is here to support
                            you every step of the way."
                        tag={{
                            title: 'Connect With',
                            icon: CableAnimatedIcon,
                        }}
                    />

                    <div className="mt-10 grid grid-cols-1 divide-y divide-border border-y md:grid-cols-3 md:divide-x md:divide-y-0">
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
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center px-4 py-8 text-center md:px-8 md:py-10"
                        >
                            <div className="mb-5 rounded-xl border border-primary/30 bg-primary/30 p-3 text-primary shadow-[inset_0_2px_6px_0_rgba(255,255,255,1),0_2px_4px_0_rgba(0,0,0,0.03),inset_0_-4px_6px_0_rgba(0,0,0,0.1)]">
                                <FaEnvelope className="h-6 w-6 md:h-7 md:w-7" />
                            </div>

                            <h3 className="mb-3 text-lg font-semibold md:text-xl">
                                Email Us
                            </h3>

                            <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                                Send us your questions and our team will respond
                                as quickly as possible.
                            </p>

                            <a
                                href="mailto:hello@shipfinder.com"
                                className="mt-auto text-base font-medium text-primary hover:underline md:text-lg"
                            >
                                hello@shipfinder.com
                            </a>
                        </motion.div>

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
                                delay: 0.6,
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center bg-muted/50 px-4 py-8 text-center md:px-8 md:py-10"
                        >
                            <div className="mb-5 rounded-xl border border-primary/30 bg-primary/30 p-3 text-primary shadow-[inset_0_2px_6px_0_rgba(255,255,255,1),0_2px_4px_0_rgba(0,0,0,0.03),inset_0_-4px_6px_0_rgba(0,0,0,0.1)]">
                                <FaHeadset className="h-6 w-6 md:h-7 md:w-7" />
                            </div>

                            <h3 className="mb-3 text-lg font-semibold md:text-xl">
                                Live Support
                            </h3>

                            <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                                Need help with vessel tracking or platform
                                features? Our support team is ready to help.
                            </p>

                            <a
                                href="mailto:support@shipfinder.com"
                                className="mt-auto text-base font-medium text-primary hover:underline md:text-lg"
                            >
                                support@shipfinder.com
                            </a>
                        </motion.div>

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
                                delay: 0.8,
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center px-4 py-8 text-center md:px-8 md:py-10"
                        >
                            <div className="mb-5 rounded-xl border border-primary/30 bg-primary/30 p-3 text-primary shadow-[inset_0_2px_6px_0_rgba(255,255,255,1),0_2px_4px_0_rgba(0,0,0,0.03),inset_0_-4px_6px_0_rgba(0,0,0,0.1)]">
                                <FaMapMarkerAlt className="h-6 w-6 md:h-7 md:w-7" />
                            </div>

                            <h3 className="mb-3 text-lg font-semibold md:text-xl">
                                Our Location
                            </h3>

                            <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                                Connect with our team and learn more about how
                                ShipFinder can support your maritime operations.
                            </p>

                            <p className="mt-auto text-base font-medium text-foreground md:text-lg">
                                Chattogram, Bangladesh
                            </p>
                        </motion.div>
                    </div>

                    <div className="mt-12 text-center">
                        <motion.p
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
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base"
                        >
                            We&apos;re committed to providing reliable maritime
                            data, fast support, and a smooth vessel tracking
                            experience.
                        </motion.p>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
