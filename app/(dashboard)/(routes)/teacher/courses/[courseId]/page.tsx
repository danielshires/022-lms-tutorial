import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';
import { IconBadge } from '@/components/icon-badge';

// Title Form
import { TitleForm } from './_components/title-form';

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
	const { userId } = auth();

	if (!userId) {
		return redirect('/');
	}

	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		},
	});

	if (!course) {
		return redirect('/');
	}

	const requiredFields = [
		course.title,
		course.description,
		course.imageURL,
		course.price,
		course.categoryID,
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;
	const completionText = `(${completedFields}/${totalFields})`;

	return (
		<div className='p-6'>
			<div className='flex flex-center justify-between'>
				<div className='flex flex-col gap-y-2'>
					<h1 className='text-2xl medium'>Course setup</h1>
					<span className='text-sm text-slate-700'>
						Complete all fields {completionText}
					</span>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
				<div>
					<div className='flex items-center gap-x-2'>
                        <IconBadge variant='default' icon={ LayoutDashboard} />
						<h2 className='text-xl'>Customise your course</h2>
					</div>
                    <TitleForm initialData={course} courseId={course.id} />
				</div>
			</div>
		</div>
	);
};

export default CourseIdPage;
