import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { motion } from "motion/react"
import { RiTimeLine } from "@remixicon/react"
import { MoveUpRight } from "lucide-react"

const posts = [
    {
        category: "Engineering",
        title: "How we cut API latency by 60% with edge caching",
        excerpt:
            "Our monolith was fast enough, until it wasn't. We traced the bottleneck to cold database reads on every request and rearchitected our caching layer in three weeks.",
        author: {
            name: "Lena Park",
            initials: "LP",
            avatar: "https://i.pravatar.cc/150?img=45",
        },
        date: "Jun 9, 2026",
        readTime: "7 Min Read",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        imageAlt: "Server rack with blinking lights in a data center",
    },
    {
        category: "Design",
        title: "Building a token system that survives a rebrand",
        excerpt:
            "Semantic tokens feel abstract until the day your brand color changes. We share the naming conventions and tooling that let us ship a full rebrand in under two days.",
        author: {
            name: "Marcus Webb",
            initials: "MW",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        date: "May 28, 2026",
        readTime: "5 Min Read",
        image:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        imageAlt: "Colour swatches and design tokens spread on a desk",
    },
    {
        category: "Product",
        title: "What 1,200 user interviews taught us about onboarding",
        excerpt:
            "Drop-off at step two turned out to have nothing to do with the UI. Listening to customers revealed a mismatch between our mental model and theirs. Here's how we fixed it.",
        author: {
            name: "Sofia Andrade",
            initials: "SA",
            avatar: "https://i.pravatar.cc/150?img=32",
        },
        date: "May 14, 2026",
        readTime: "9 Min Read",
        image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        imageAlt: "Two people in a user research interview session",
    },
]

export default function BlogBlock() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post, i) => (
                <motion.div
                    key={i}
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
                        delay: i * 0.2
                    }}
                    viewport={{ once: true }}
                >
                    <Card
                        key={post.title}
                        className="group flex flex-col overflow-hidden border-border pt-0 transition-shadow duration-200"
                    >
                        <div className="aspect-video w-full overflow-hidden border-b border-border bg-muted">
                            <img
                                src={post.image}
                                alt={post.imageAlt}
                                className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                        </div>

                        <CardHeader className="gap-2 pb-3">
                            <div className="flex items-center justify-between gap-2">
                                <Badge
                                    variant="secondary"
                                    className="text-[11px] font-semibold tracking-wide uppercase"
                                >
                                    {post.category}
                                </Badge>
                                <span className="flex shrink-0 items-center gap-1 text-xs leading-none text-muted-foreground">
                                    <RiTimeLine size={11} className="shrink-0" />
                                    {post.readTime}
                                </span>
                            </div>
                            <CardTitle className="text-base leading-snug font-semibold duration-300 group-hover:text-primary">
                                {post.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                                {post.excerpt}
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="border-t border-border pt-4 pb-4">
                            <div className="flex w-full items-center justify-between gap-3">
                                <span className="text-xs font-medium text-muted-foreground">12 Jun, 2026</span>
                                <button className="flex items-center gap-1 group-hover:text-primary duration-300">
                                    <span>Read more</span>
                                    <MoveUpRight
                                        size={14}
                                        className="shrink-0 text-muted-foreground group-hover:text-primary duration-100 group-hover:mt-1 group-hover:rotate-44" />
                                </button>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}