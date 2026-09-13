import { IconHelp, IconMailStar } from "@tabler/icons-react"
import { RxDashboard } from "react-icons/rx"
import { PanelTop, Settings, Ship, TowerControl, User, UserShield, UserStar } from "lucide-react";
import { BiWorld } from "react-icons/bi";

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
                label: "Frontend",
                icon: PanelTop,
                link: 'admin.frontend.index',
                permission: 'ui.view'
            },
            {
                label: "Setting",
                icon: Settings,
                link: 'admin.setting.index',
                permission: 'settings.view'
            },
            {
                label: "Mail SMTP",
                icon: IconMailStar,
                link: 'admin.smtp.index',
                permission: 'smtp.view'
            },
        ],
    },
    {
        heading: 'Api',
        items: [
            {
                label: "DataDoc Api",
                icon: Ship,
                link: 'admin.datadoc.index',
                permission: 'api.view'
            },
            {
                label: "Country",
                icon: BiWorld,
                link: 'admin.country.index',
                permission: 'country.view'
            },
            {
                label: "Port",
                icon: TowerControl,
                link: 'admin.port.index',
                permission: 'port.view'
            },
        ]
    }
]

export { navGroups }