import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import {
    ButtonGroup,
    ButtonGroupSeparator,
} from '@/components/ui/button-group';
import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { MdDevices } from 'react-icons/md';

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <ButtonGroup>
            <Button
                variant={theme == 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
            >
                <MdLightMode />
                Light
            </Button>
            <ButtonGroupSeparator />
            <Button
                variant={theme == 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
            >
                <MdDarkMode />
                Dark
            </Button>
            <ButtonGroupSeparator />
            <Button
                variant={theme == 'system' ? 'default' : 'outline'}
                onClick={() => setTheme('system')}
            >
                <MdDevices />
                Automatic
            </Button>
        </ButtonGroup>
    );
}
