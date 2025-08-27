import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  // Protect the endpoint: only allow authenticated users
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // A simple check to see if the user is an assistant.
  // In a real app, you might add a 'role' to your session token for better security.
  if (session.user.name !== 'Assistant') {
     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    // Fetch all jobs from the queue that are not yet marked as 'applied'
    const { rows } = await db.sql`
      SELECT id, user_email, job_link, resume_type, priority, status, submitted_at 
      FROM job_queue 
      WHERE status != 'applied' 
      ORDER BY submitted_at ASC;
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching job queue:', error);
    return NextResponse.json({ error: 'Failed to fetch job queue' }, { status: 500 });
  }
}