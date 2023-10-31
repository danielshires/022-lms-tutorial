'use-client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {

	const pathname = usePathname();
	const router = useRouter();

	const isActive =
		(pathname === '/' && href === '/') ||
		pathname === href ||
		pathname?.startsWith(`${href}/`);

	const onClick = () => {
		router.push(href);
	};

	return (
		<button
			onClick={onClick}
			type='button'
			className={cn(
				'flex items-center gap-x-2 pl-6 text-sm font-medium duration-200 rounded-lg text-slate-500 transition-all hover:text-slate-500 hover:bg-slate-300/20 dark:hover:bg-gray-700',
				isActive &&
					'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700',
			)}>
			<div className='flex items-center gap-x-2 py-4'>
				<Icon
					size={22}
					className={cn('text-slate-500', isActive && 'text-sky-700')}
				/>
				{label}
			</div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                isActive && "opacity-100"
            )}/>
		</button>
	);
};