'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Title is required',
	}),
});

interface TitleFormProps {
	initialData: {
		title: string;
	};
	courseId: string;
}

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => {
		setIsEditing((current) => !current);
	};
    const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {

		try {
		    await axios.patch(`/api/courses/${courseId}`, values);
		    toast.success('Course updated successfully');
            toggleEdit()
            router.refresh()
		} catch {
		    toast.error('Something went wrong');
		}
	};

	return (
		<div className='mt-6 border bg-slate-100 rounded-md p-4'>
			<div className='font-md flex items-center justify-between'>
				Course title
				<Button onClick={toggleEdit} variant='ghost'>
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className='h-4 mr-2' size={18} />
							Edit title
						</>
					)}
				</Button>
			</div>
			{!isEditing && <p className='text-sm mt-2'>{initialData.title}</p>}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 mt-4'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											disabled={isSubmitting}
											placeholder='e.g. "Advanced web development"'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex items-center gap-x-2'>
                        <Button type='submit' disabled={!isValid || isSubmitting}>
								Save
							</Button>
							<Button type='button' variant='ghost' onClick={toggleEdit}>
								Cancel
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};
