"use client"
// Import the necessary libraries and components
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

// Define a schema for the form data using the zod library
const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required',
    }),
});

const CreatePage = () => {
    // Get the router object from the Next.js useRouter hook
    const router = useRouter();

    // Use the useForm hook from the react-hook-form library to manage the form state
    const form = useForm<z.infer<typeof formSchema>>({
        // Use the zodResolver function from the @hookform/resolvers/zod library to validate the form data
        resolver: zodResolver(formSchema),
        // Set the default values for the form fields
        defaultValues: {
            title: '',
        },
    });

    // Get the isSubmitting and isValid properties from the form state
    const { isSubmitting, isValid } = form.formState;

    // Define a function to handle form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            // Send a POST request to the server with the form data
            const response = await axios.post('/api/courses', values);
            // Redirect the user to the newly created course page
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success('Course created successfully');
        } catch {
            toast.error('Something went wrong')
        }
    };

    return (
        <div className='max-w-5xl mx-auto flex flex-col after:md:items-center md:justify-center h-full p-6'>
            {' '}
            <h1 className='text-2xl'>Name your course</h1>
            <p className='text-sm text-slate-600'>
                What would you like to name your course? Don&apos;t worry, you can
                change this later?
            </p>
            {/* Render the form using the Form component from the react-hook-form library */}
            <Form {...form}>
                {/* Render the form fields */}
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
                    {/* Render the course title field using the FormField component */}
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Title</FormLabel>
                                <FormControl>
                                    {/* Render the input field using the Input component */}
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Advanced web developent'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this course?
                                </FormDescription>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    {/* Render the cancel and continue buttons */}
                    <div className='flex items-center gap-x-2'>
                        <Link href='/teacher/courses'>
                            <Button type='button' variant='ghost'>
                                Cancel
                            </Button>
                        </Link>
                        <Button type='submit' disabled={!isValid || isSubmitting}>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreatePage;
