import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// 1. Extend types
declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session {
        user: {
            role?: string;
        } & import("next-auth").DefaultSession["user"];
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                // 🔍 DEBUG 1: Check what DB returns
                console.log("----------------------------------------------");
                console.log("DEBUG: Database User Found:", user?.email);
                console.log("DEBUG: Role in Database:", user?.role);
                console.log("----------------------------------------------");

                if (!user || !user.password) return null;

                const isMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isMatch) return null;

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // 🔍 DEBUG 2: Check if role is passed to Token
            if (user) {
                console.log("DEBUG: JWT Callback (First Login)");
                console.log("DEBUG: Assigning Role to Token:", user.role);
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // 🔍 DEBUG 3: Check if role is passed to Session
            if (session.user) {
                // console.log("DEBUG: Session Callback Running");
                // console.log("DEBUG: Role in Token:", token.role);

                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
});