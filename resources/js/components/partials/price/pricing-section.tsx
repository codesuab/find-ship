import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { type FREQUENCY, FrequencyToggle } from "@/components/partials/price/frequency-toggle";
import { IconStar, IconCircleCheck } from "@tabler/icons-react";
import { router } from "@inertiajs/react";
import SlideUpButton from "@/components/slideup-button";

type Plan = {
	name: string;
	info: string;
	price: {
		monthly: number;
		yearly: number; // yearly per month
	};
	features: string[];
	btn: {
		text: string;
		href: string;
	};
	highlighted?: boolean;
};

const plans: Plan[] = [
	{
		name: "Basic",
		info: "For most individuals",
		price: {
			monthly: 1499,
			yearly: 14999,
		},
		features: [
			"Up to 3 Blog posts",
			"Up to 3 Transcriptions",
			"Up to 3 Posts stored",
			"Markdown support",
			"Community support",
			"AI powered suggestions",
		],
		btn: {
			text: "Start Your Free Trial",
			href: "#",
		},
	},
	{
		highlighted: true,
		name: "Pro",
		info: "For small businesses",
		price: {
			monthly: 2499,
			yearly: 24999,
		},
		features: [
			"Up to 500 Blog Posts",
			"Up to 500 Transcriptions",
			"Up to 500 Posts stored",
			"Unlimited Markdown support",
			"SEO optimization tools",
			"Priority support",
			"AI powered suggestions",
		],
		btn: {
			text: "Get started",
			href: "#",
		},
	},
	{
		name: "Business",
		info: "For large organizations",
		price: {
			monthly: 3499,
			yearly: 36999,
		},
		features: [
			"Unlimited Blog Posts",
			"Unlimited Transcriptions",
			"Unlimited Posts stored",
			"Unlimited Markdown support",
			"SEO optimization tools",
			"Priority support",
			"AI powered suggestions",
		],
		btn: {
			text: "Contact team",
			href: "#",
		},
	},
];

export function PricingSection() {
	const [frequency, setFrequency] = React.useState<"monthly" | "yearly">(
		"monthly"
	);

	return (
		<div className="flex w-full flex-col items-center justify-center space-y-7">
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
				}}
				viewport={{ once: true }}
			>
				<FrequencyToggle frequency={frequency} setFrequency={setFrequency} />
			</motion.div>
			<div className="mx-auto grid w-full max-w-[90%] grid-cols-1 gap-4 md:grid-cols-3">
				{plans.map((plan, i) => (
					<motion.div key={i}
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
							delay: i * 0.2,
							ease: 'easeInOut',
						}}
						viewport={{ once: true }}
					>
						<PricingCard frequency={frequency} key={plan.name} plan={plan} />
					</motion.div>
				))}
			</div>
		</div>
	);
}

type PricingCardProps = React.ComponentProps<"div"> & {
	plan: Plan;
	frequency?: FREQUENCY;
};

export function PricingCard({
	plan,
	className,
	frequency = "monthly",
	...props
}: PricingCardProps) {
	return (
		<div
			className={cn(
				"relative flex w-full h-full flex-col overflow-hidden rounded-4xl border shadow-xs bg-accent p-4",
				plan.highlighted && "scale-105 bg-primary",
				className
			)}
			key={plan.name}
			{...props}
		>
			<div className="pb-5">
				<AnimatePresence mode="wait">
					<div className="absolute top-4 right-4 z-10 flex items-center gap-2">
						{plan.highlighted && (
							<motion.div
								className="flex items-center gap-1 rounded-md bg-background px-2 py-0.5 text-xs"
								key="popular-badge"
								layout
								transition={{ duration: 0.1 }}
							>
								<IconStar className="size-3 fill-current" />
								Popular
							</motion.div>
						)}
					</div>
				</AnimatePresence>

				<div className={cn('font-bold text-2xl', plan.highlighted && 'text-white')}>{plan.name}</div>
				<p className={cn('font-normal text-muted-foreground text-sm',
					plan.highlighted && 'text-white'
				)}>{plan.info}</p>
			</div>
			<div
				className={cn(
					"text-muted-foreground text-sm border border-border h-full flex flex-col gap-2 justify-between bg-white rounded-3xl p-4"
				)}
			>
				<div className="mb-4">
					<h3 className="flex w-max items-end gap-1 text-foreground">
						<NumberFlow
							className='font-extrabold text-3xl [&::part(suffix)]:font-normal [&::part(suffix)]:text-base [&::part(suffix)]:text-foreground'
							format={{
								style: "currency",
								currency: "BDT",
								notation: "standard",
							}}
							suffix="/month"
							value={plan.price[frequency]}
						/>
					</h3>
					<p className='font-normal text-xs text-foreground'>
						billed {frequency}
					</p>
				</div>

				{plan.features.map((feature) => (
					<div className="flex items-center gap-2" key={feature}>
						<IconCircleCheck className="size-3.5 text-foreground" />
						<p className='text-foreground'>{feature}</p>
					</div>
				))}

				<SlideUpButton onClick={() => router.get(plan.btn.href)} className={`py-1.5 mt-4 w-full ${plan.highlighted ? 'bg-primary' : 'bg-transparent text-foreground border border-border'}`}>
					{plan.btn.text}
				</SlideUpButton>
			</div>
		</div>
	);
}
