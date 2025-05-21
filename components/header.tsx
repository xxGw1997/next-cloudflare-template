import Link from 'next/link'

import LoginModal from '@/components/login/login-modal'
import Logo from '@/components/logo'
import { cn } from '@/lib/utils'

import DarkToggle from './dark-toggle'
import { Button } from './ui/button'

export default async function Header({ className }: { className?: string }) {
  return (
    <header className={cn('z-50 container mx-auto flex items-center justify-between p-4', className)}>
      <Logo />
      <section className="flex items-center gap-2">
        <LoginModal />
        <Button variant="outline" asChild>
          <Link href="/about">About</Link>
        </Button>
        <DarkToggle />
      </section>
    </header>
  )
}
