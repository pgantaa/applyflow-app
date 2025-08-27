import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
// Note: You might need to create a separate authOptions file if you haven't already
// For simplicity, I'll assume your NextAuth config is accessible.
// Let's import the handler directly for this example.
import { handler as authHandler } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  // 1. Protect the endpoint: Ensure the user is logged in
  const session = await getServerSession(authHandler);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { jobLink, resumeType, priority } = await request.json();
    const { id: userId, email: userEmail } = session.user;

    if (!jobLink || !resumeType || !priority) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Insert the job into the new queue table
    await db.sql`
      INSERT INTO job_queue (user_id, user_email, job_link, resume_type, priority)
      VALUES (${userId}, ${userEmail}, ${jobLink}, ${resumeType}, ${priority});
    `;

    // 3. (Optional) Deduct a credit from the user's account here

    return NextResponse.json({ message: 'Job delegated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting job:', error);
    return NextResponse.json({ error: 'Failed to delegate job' }, { status: 500 });
  }
}