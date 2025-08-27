import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; // <-- Import authOptions

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { jobLink, resumeType, priority } = await request.json();
    const userId = session.user.id ?? 'unknown-user'; 
    const userEmail = session.user.email;

    if (!jobLink || !resumeType || !priority) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.sql`
      INSERT INTO job_queue (user_id, user_email, job_link, resume_type, priority)
      VALUES (${userId}, ${userEmail}, ${jobLink}, ${resumeType}, ${priority});
    `;

    return NextResponse.json({ message: 'Job delegated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting job:', error);
    return NextResponse.json({ error: 'Failed to delegate job' }, { status: 500 });
  }
}