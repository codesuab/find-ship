import { IconHelp } from "@tabler/icons-react"
import { RxDashboard } from "react-icons/rx"
import { User, UserStar } from "lucide-react";

type IconProps = {
    className?: string
    size?: number | string
}

type IconRenderer = React.ComponentType<IconProps>

type NavItem = {
    label: string
    icon: IconRenderer
    active?: boolean
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
                active: true,
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
            },
            {
                label: "Admins",
                icon: UserStar,
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