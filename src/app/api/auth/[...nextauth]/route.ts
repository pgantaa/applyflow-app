import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';

// 1. Define and export your auth options so they can be reused
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const result = await db.sql`SELECT * FROM assistants WHERE email = ${credentials.email};`;
        const assistant = result.rows[0];
        if (!assistant) return null;
        const passwordsMatch = await bcrypt.compare(credentials.password, assistant.password_hash);
        if (passwordsMatch) {
          return { id: assistant.id.toString(), email: assistant.email, name: "Assistant" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// 2. Create the handler using the exported options
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };