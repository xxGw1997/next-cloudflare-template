import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import ResendProvider from 'next-auth/providers/resend'

import { createDb } from '@/lib/db'

import { accounts, sessions, users, verificationTokens } from './db/schema'

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const db = createDb()

  return {
    secret: process.env.AUTH_SECRET,
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens
    }),
    providers: [
      Google,
      Github,
      ResendProvider({
        from: 'no-reply@943578.xyz'
      })
    ],
    session: {
      strategy: 'jwt'
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.id = user.id
        }
        return token
      },
      session: async ({ session, token }) => {
        if (token && session.user) {
          session.user.id = token.id as string
        }
        return session
      }
    }
  }
})
