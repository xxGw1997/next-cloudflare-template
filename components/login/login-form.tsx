'use client'

import { Github, Mail, Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface LoginFormProps {
  onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState({
    google: false,
    github: false,
    email: false
  })

  const handleSignIn = async (provider: 'google' | 'github' | 'resend') => {
    setIsLoading((prev) => ({ ...prev, [provider]: true }))
    try {
      const result = await signIn(provider, {
        ...(provider === 'resend' ? { email } : {}),
        redirect: false
      })

      if (result?.ok && !result?.error && onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
    } finally {
      setIsLoading((prev) => ({ ...prev, [provider]: false }))
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    handleSignIn('resend')
  }

  return (
    <div className="space-y-6">
      <Button
        onClick={() => handleSignIn('google')}
        disabled={isLoading.google}
        className="w-full bg-white font-semibold text-gray-800 shadow-md transition-all duration-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        {isLoading.google ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
            <path fill="none" d="M1 1h22v22H1z" />
          </svg>
        )}
        Continue with Google
      </Button>

      <Button
        onClick={() => handleSignIn('github')}
        disabled={isLoading.github}
        className="w-full bg-gray-900 font-semibold text-white shadow-md transition-all duration-200 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {isLoading.github ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-5 w-5" />}
        Continue with GitHub
      </Button>

      <div className="relative my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="mx-4 flex-shrink text-xs text-gray-500 uppercase dark:text-gray-400">Or continue with</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <Button
          type="submit"
          disabled={isLoading.email}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
        >
          {isLoading.email ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-5 w-5" />}
          Sign in with Email
        </Button>
      </form>
    </div>
  )
}
