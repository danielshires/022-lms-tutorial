// Import the necessary libraries and components
import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define a set of background variants using the class-variance-authority library
const backgroundVariants = cva(
    'rounded-full flex items-center justify-center',
    {
        variants: {
            variant: {
                default: 'bg-sky-100',
                success: 'bg-emerald-100',
            },
            size: {
                default: 'p-2',
                sm: 'p-1',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

// Define a set of icon variants using the class-variance-authority library
const iconVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sky-700',
            success: 'text-emerald-700',
        },
        size: {
            default: 'h-6 w-6',
            sm: 'h-4 w-4',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

// Define the types for the background and icon variants
type backgroundVariants = VariantProps<typeof backgroundVariants>;
type iconVariants = VariantProps<typeof iconVariants>;

// Define the props for the IconBadge component
interface IconBadgeProps extends backgroundVariants, iconVariants {
    icon: LucideIcon;
}

// Define the IconBadge component
export const IconBadge = ({
    icon: Icon,
    variant,
    size,
}: IconBadgeProps) => {
    return (
        <div className={cn(backgroundVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    );
};
