import AuthButton from './AuthButton'
import { Bookmark } from 'lucide-react'

export default function Navbar({ userEmail }: { userEmail?: string }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Bookmark className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
            SyncMark
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {userEmail && (
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Signed in as</span>
              <span className="text-sm font-semibold text-slate-700">{userEmail}</span>
            </div>
          )}
          <AuthButton mode="logout" />
        </div>
      </div>
    </nav>
  )
}
