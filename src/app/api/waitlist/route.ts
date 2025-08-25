import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log("POSTGRES_URL found:", process.env.POSTGRES_URL);
  try {
    const { name, email, phone, status } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Insert the new user into the waitlist table
    await db.sql`
      INSERT INTO waitlist (name, email, phone, status)
      VALUES (${name}, ${email}, ${phone}, ${status});
    `;

    return NextResponse.json({ message: 'Successfully joined waitlist' }, { status: 200 });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}