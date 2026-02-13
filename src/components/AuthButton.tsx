'use client'

import { createClient } from '@/utils/supabase/client'
import Button from './ui/Button'
import { LogOut } from 'lucide-react'
import { FcGoogle } from "react-icons/fc";
export default function AuthButton({ mode = 'login' }: { mode?: 'login' | 'logout' }) {
  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (mode === 'logout') {
    return (
      <Button variant="ghost" onClick={handleSignOut} className="gap-2 font-medium text-slate-600 hover:text-slate-900">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    )
  }

  return (
    <button
      onClick={handleSignIn}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
    >
      <FcGoogle className="w-5 h-5 text-slate-500" />
      Sign in with Google
    </button>
  )
}
