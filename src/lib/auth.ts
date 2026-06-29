import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db"; // Assuming db is exported from src/lib/db.ts
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
// import bcrypt from "bcryptjs"; // You would install and use this for password hashing

export const authConfig = {
  // adapter: PrismaAdapter(db), // Optional: Use if you want database sessions or specific user management
  // If using PrismaAdapter, your User model needs to conform to Auth.js's AdapterUser interface
  // or you need to map fields. For a simple CredentialsProvider with JWT, it's often not strictly needed.

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          return null; // User not found
        }

        // --- IMPORTANT SECURITY NOTE ---
        // The provided DB schema `model User { id Int @id name String email String }`
        // does NOT include a password field.
        // For a secure CredentialsProvider, your `User` model MUST include a `hashedPassword` field.
        // Example: `model User { id Int @id ... email String @unique hashedPassword String }`
        //
        // You would then hash the user's password during registration and store it.
        // Here, you would compare the provided `credentials.password` with the stored `user.hashedPassword`.
        // Example: `const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);`
        // If `isPasswordValid` is false, return `null`.
        //
        // For the purpose of providing a complete file structure, we are returning the user
        // if found, but this is INSECURE without actual password verification.
        // This section MUST be updated with proper password hashing and comparison in production.
        // --- END SECURITY NOTE ---

        // Placeholder for password verification (replace with actual hashing and comparison)
        // For demonstration, assuming a successful login if user exists.
        // In a real app, you'd verify `credentials.password` against `user.hashedPassword`.
        // Example:
        // const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        // if (!isPasswordValid) {
        //   return null;
        // }

        return {
          id: user.id.toString(), // Auth.js expects string IDs
          name: user.name,
          email: user.email,
        };
      },
    }),
    // Add other providers here (e.g., GoogleProvider, GitHubProvider)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    // error: "/auth/error", // Custom error page
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // User object is available on first sign-in
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Session object is available on every request
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, // Required for JWT and session encryption
  // debug: process.env.NODE_ENV === "development", // Enable debug logs in development
} satisfies NextAuthConfig;

// The `auth` function is used in API routes (e.g., `app/api/auth/[...nextauth]/route.ts`)
// and for server components/actions to get the session.
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);

// Extend the NextAuth session type to include custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
  }
}

// Extend the NextAuth JWT type to include custom fields
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
  }
}
