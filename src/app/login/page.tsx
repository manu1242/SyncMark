import AuthButton from '@/components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[380px] space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome to SyncMark
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-normal">
            Your real-time digital library. Please sign in to continue.
          </p>
        </div>

        <div className="mt-8">
          <AuthButton mode="login" />
        </div>

        <div className="flex items-center justify-center">
            <p className="text-[12px] text-slate-400 font-medium uppercase tracking-widest">
                Google Secure Auth
            </p>
        </div>
      </div>
    </div>
  )
}
