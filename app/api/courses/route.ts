// Import the Prisma client instance from the db module
import { db } from '@/lib/db';

// Import the NextResponse type from the next/server module
import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

// Define an async function called POST that takes a Request object as its argument
export async function POST(req: Request) {
  try {
    // Call the auth function to get the user ID from the request headers
    const { userId } = auth();

    // Parse the request body as JSON and extract the title field
    const { title } = await req.json();

    // If the userId field is missing, return a 401 Unauthorized response
    if (!userId) return new NextResponse('Unathorised', { status: 401 });

    // Use the Prisma client to create a new course with the given user ID and title
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    // Return a JSON response containing the newly created course
    return NextResponse.json(course);
  } catch (error) {
    // If an error occurs, log it to the console and return a 500 Internal Server Error response
    console.log('[COURSES', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

