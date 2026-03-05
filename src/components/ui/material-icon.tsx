import { cn } from "@/lib/utils";

interface MaterialIconProps {
    name: string;
    className?: string;
    size?: number;
    filled?: boolean;
}

/**
 * Google Material Symbols Outlined icon component.
 * Uses the CDN loaded in root layout.
 *
 * Usage: <MaterialIcon name="home" size={20} />
 *
 * @see https://fonts.google.com/icons
 */
export function MaterialIcon({
    name,
    className,
    size = 24,
    filled = false,
}: MaterialIconProps) {
    return (
        <span
            className={cn("material-symbols-outlined leading-none select-none", className)}
            style={{
                fontSize: size,
                fontVariationSettings: filled
                    ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                    : undefined,
            }}
            aria-hidden="true"
        >
            {name}
        </span>
    );
}
