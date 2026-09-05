import { IconHelp, IconMailStar } from "@tabler/icons-react"
import { RxDashboard } from "react-icons/rx"
import { Settings, Ship, User, UserShield, UserStar } from "lucide-react";

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
    permission?: string | ''
}

const navGroups: { heading?: string; items: NavItem[] }[] = [
    {
        heading: 'Menu',
        items: [
            {
                label: "Dashboard",
                icon: RxDashboard,
                link: 'admin.dashboard',
                permission: 'dashboard.view'
            },
        ],
    },
    {
        heading: 'People',
        items: [
            {
                label: "Customer",
                icon: User,
                link: 'admin.customer.index',
                permission: 'customers.view'
            },
            {
                label: "Admins",
                icon: UserStar,
                link: 'admin.admin.index',
                permission: 'admins.view'
            },
        ],
    },
    {
        heading: 'Configure',
        items: [
            {
                label: "Role & Permission",
                icon: UserShield,
                link: 'admin.role.index',
                permission: 'roles.view'
            },
            {
                label: "Setting",
                icon: Settings,
                link: 'admin.customer.index',
                permission: 'settings.view'
            },
            {
                label: "Mail SMTP",
                icon: IconMailStar,
                link: 'admin.smtp.index',
                permission: 'smtp.view'
            },
            {
                label: "Vessel Api",
                icon: Ship,
                link: 'admin.admin.index',
                permission: 'vessels.view'
            },
        ],
    },
]

export { navGroups }