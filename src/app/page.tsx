import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import AddBookmarkForm from '@/components/AddBookmarkForm'
import BookmarkList from '@/components/BookmarkList'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar userEmail={user.email} />
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">Your Library</h1>
          <p className="text-slate-500 text-lg font-normal max-w-2xl">
            Save links, organize resources, and access your bookmarks in real-time.
          </p>
        </header>

        <div className="space-y-12">
          <section>
            <AddBookmarkForm userId={user.id} />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Recent Bookmarks
              </h2>
              <div className="h-px bg-slate-200 flex-1 ml-4"></div>
            </div>
            <BookmarkList initialBookmarks={bookmarks || []} userId={user.id} />
          </section>
        </div>
      </div>
    </main>
  )
}
