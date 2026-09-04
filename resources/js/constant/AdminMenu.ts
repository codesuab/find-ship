import { IconHelp, IconMailStar } from "@tabler/icons-react"
import { RxDashboard } from "react-icons/rx"
import { Settings, Ship, User, UserStar } from "lucide-react";

type IconProps = {
    className?: string
    size?: number | string
}

type IconRenderer = React.ComponentType<IconProps>

type NavItem = {
    label: string
    icon: IconRenderer
    badge?: string
    link?: string | '#'
}

const navGroups: { heading?: string; items: NavItem[] }[] = [
    {
        heading: 'Menu',
        items: [
            {
                label: "Dashboard",
                icon: RxDashboard,
                link: 'admin.dashboard'
            },
        ],
    },
    {
        heading: 'People',
        items: [
            {
                label: "Customer",
                icon: User,
                link:'admin.customer.index'
            },
            {
                label: "Admins",
                icon: UserStar,
                link: 'admin.admin.index'
            },
        ],
    },
    {
        heading: 'Configure',
        items: [
            {
                label: "Setting",
                icon: Settings,
                link:'admin.customer.index'
            },
            {
                label: "Mail SMTP",
                icon: IconMailStar,
                link: 'admin.smtp.index'
            },
            {
                label: "Vessel Api",
                icon: Ship,
                link: 'admin.admin.index'
            },
        ],
    },
]

const secondNavGroups = [
    {
        label: "Get Help",
        icon: IconHelp,
    },
]

export { navGroups, secondNavGroups }