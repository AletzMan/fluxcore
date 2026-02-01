import { LucideIcon } from "lucide-react";

interface IconProps {
    icon: LucideIcon;
    size?: number;
    strokeWidth?: number;
}

export function Icon({ icon: Icon, size = 24, strokeWidth }: IconProps) {
    return (
        <Icon
            size={size}
            strokeWidth={strokeWidth}
            absoluteStrokeWidth
        />
    );
}
