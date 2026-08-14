import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import PageHeader from '@/components/partials/PageHeader'
import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import SlideUpButton from '@/components/slideup-button'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaEnvelope, FaHeadset } from 'react-icons/fa6'
import { motion, Variants } from 'motion/react'

export default function contact() {
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 10, },
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
                type: "spring",
                stiffness: 260,
                damping: 24,
            },
        },
    };

    // subject
    const items = [
        { label: "Select a Type", value: null },
        { label: "Payment", value: "payment" },
        { label: "Technical", value: "technical" },
        { label: "Application", value: "application" },
        { label: "Bug or Issue", value: "issue" },
        { label: "Custom", value: "custom" },
    ]
    return (
        <AppLayout key='contact'>
            <Head>
                <title>Get In Touch</title>
            </Head>

            {/* content */}
            <PageHeader title='Get In Touch' subtitle="Connect with our team for expert vessel tracking support, reliable maritime data, and solutions tailored to your operational needs." />

            {/* form */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='container pb-20'>
                <div className='max-w-xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <motion.div variants={itemVariants} viewport={{ amount: 0.2 }}>
                        <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <Input type="text" placeholder="Sahab" />
                        </Field>
                    </motion.div>
                    <motion.div variants={itemVariants} viewport={{ amount: 0.2 }}>
                        <Field>
                            <FieldLabel>Last Name</FieldLabel>
                            <Input type="text" placeholder="Ahmad" />
                        </Field>
                    </motion.div>
                    <div className='col-span-1 md:col-span-2 space-y-4'>
                        <motion.div variants={itemVariants} viewport={{ amount: 0.2 }}>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input type="email" placeholder="Type your email address" />
                            </Field>
                        </motion.div>
                        <motion.div variants={itemVariants} viewport={{ amount: 0.2 }}>
                            <Field>
                                <FieldLabel>Phone</FieldLabel>
                                <Input type="tel" placeholder="Type your phone" />
                            </Field>
                        </motion.div>
                        <motion.div variants={itemVariants} viewport={{ amount: 0.2 }}>
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
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </motion.div>
                        <motion.div variants={itemVariants} viewport={{ amount: 0.2 }}>
                            <Field>
                                <FieldLabel>Message</FieldLabel>
                                <Textarea placeholder="Type your message here." className='min-h-30' />
                            </Field>
                        </motion.div>
                        <motion.div variants={itemVariants} viewport={{ amount: 0.2 }}>
                            <SlideUpButton className='w-full'>
                                Send Message
                            </SlideUpButton>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* contact info */}
            <section className='pb-25'>
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <motion.h2
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
                            }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold tracking-tight md:text-5xl text-gradient-up">
                            Let&apos;s build something great together
                        </motion.h2>

                        <motion.p
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
                                delay: 0.2,
                            }}
                            viewport={{ once: true }}
                            className="text-muted-foreground mt-5 text-base leading-relaxed md:text-lg">
                            Have questions about our vessel tracking platform,
                            partnerships, or features? Our team is here to support
                            you every step of the way.
                        </motion.p>
                    </div>

                    <div className="divide-border grid grid-cols-1 divide-y border-y md:grid-cols-3 md:divide-x md:divide-y-0">
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
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center px-4 py-8 text-center md:px-8 md:py-10">
                            <div className="bg-primary/30 text-primary border-primary/30 mb-5 rounded-xl border p-3 shadow-[inset_0_2px_6px_0_rgba(255,255,255,1),0_2px_4px_0_rgba(0,0,0,0.03),inset_0_-4px_6px_0_rgba(0,0,0,0.1)]">
                                <FaEnvelope className="h-6 w-6 md:h-7 md:w-7" />
                            </div>

                            <h3 className="mb-3 text-lg font-semibold md:text-xl">
                                Email Us
                            </h3>

                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed md:text-base">
                                Send us your questions and our team will respond
                                as quickly as possible.
                            </p>

                            <a
                                href="mailto:hello@shipfinder.com"
                                className="text-primary mt-auto text-base font-medium hover:underline md:text-lg"
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.6,
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center bg-muted/50 px-4 py-8 text-center md:px-8 md:py-10">
                            <div className="bg-primary/30 text-primary border-primary/30 mb-5 rounded-xl border p-3 shadow-[inset_0_2px_6px_0_rgba(255,255,255,1),0_2px_4px_0_rgba(0,0,0,0.03),inset_0_-4px_6px_0_rgba(0,0,0,0.1)]">
                                <FaHeadset className="h-6 w-6 md:h-7 md:w-7" />
                            </div>

                            <h3 className="mb-3 text-lg font-semibold md:text-xl">
                                Live Support
                            </h3>

                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed md:text-base">
                                Need help with vessel tracking or platform
                                features? Our support team is ready to help.
                            </p>

                            <a
                                href="mailto:support@shipfinder.com"
                                className="text-primary mt-auto text-base font-medium hover:underline md:text-lg"
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.8,
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center px-4 py-8 text-center md:px-8 md:py-10">
                            <div className="bg-primary/30 text-primary border-primary/30 mb-5 rounded-xl border p-3 shadow-[inset_0_2px_6px_0_rgba(255,255,255,1),0_2px_4px_0_rgba(0,0,0,0.03),inset_0_-4px_6px_0_rgba(0,0,0,0.1)]">
                                <FaMapMarkerAlt className="h-6 w-6 md:h-7 md:w-7" />
                            </div>

                            <h3 className="mb-3 text-lg font-semibold md:text-xl">
                                Our Location
                            </h3>

                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed md:text-base">
                                Connect with our team and learn more about how
                                ShipFinder can support your maritime operations.
                            </p>

                            <p className="text-foreground mt-auto text-base font-medium md:text-lg">
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
                                filter: 'blur(0)'
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                                delay: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="text-muted-foreground mx-auto max-w-xl text-sm md:text-base">
                            We&apos;re committed to providing reliable maritime
                            data, fast support, and a smooth vessel tracking
                            experience.
                        </motion.p>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
