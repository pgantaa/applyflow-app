import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';

console.log("NextAuth configuration file loaded."); // Confirms the file is being read

const handler = NextAuth({
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
        console.log("--- Authorize function started ---");
        
        if (!credentials?.email || !credentials.password) {
          console.log("Authorize failed: Missing credentials.");
          return null;
        }

        console.log(`Attempting to authorize user: ${credentials.email}`);

        try {
          const result = await db.sql`
            SELECT * FROM assistants WHERE email = ${credentials.email};
          `;
          
          console.log(`Database query returned ${result.rows.length} rows.`);

          if (result.rows.length === 0) {
            console.log("Authorize failed: Assistant not found in database.");
            return null;
          }
          
          const assistant = result.rows[0];
          console.log("Assistant found:", assistant.email);
          console.log("Stored password hash:", assistant.password_hash);

          const passwordsMatch = await bcrypt.compare(credentials.password, assistant.password_hash);
          console.log(`Password comparison result: ${passwordsMatch}`);

          if (passwordsMatch) {
            console.log("Authorize successful. Passwords match.");
            return { id: assistant.id.toString(), email: assistant.email, name: "Assistant" };
          } else {
            console.log("Authorize failed: Passwords do not match.");
            return null;
          }
        } catch (error) {
          console.error("Authorize error: An error occurred during the process.", error);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }