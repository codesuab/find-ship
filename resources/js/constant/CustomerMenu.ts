import { IconHelp, IconSettings } from "@tabler/icons-react"
import { Anchor, Info, LocateFixed, Ship } from "lucide-react"
import { RxDashboard } from "react-icons/rx"
import { LuMapPinned } from "react-icons/lu";
import { GiShipBow } from "react-icons/gi";

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
}

const navGroups: { heading?: string; items: NavItem[] }[] = [
    {
        heading: 'Menu',
        items: [
            {
                label: "Dashboard",
                icon: RxDashboard,
                active: true,
            },
        ],
    },
    {
        heading: 'Workspace',
        items: [
            {
                label: "Map",
                icon: LuMapPinned,
            },
            {
                label: "Arrival",
                icon: Ship,
            },
            {
                label: "In Port",
                icon: Anchor,
            },
            {
                label: "Departure",
                icon: GiShipBow,
            },
        ],
    },
    {
        heading: 'Extra',
        items: [
            {
                label: "Vessel Position",
                icon: LocateFixed,
            },
            {
                label: "Vessel Info",
                icon: Info,
            },
        ],
    },
]

const secondNavGroups = [
    {
        label: "Settings",
        icon: IconSettings,
    },
    {
        label: "Get Help",
        icon: IconHelp,
    },
]

export { navGroups, secondNavGroups }