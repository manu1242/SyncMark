'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Trash2, ExternalLink, Bookmark } from 'lucide-react'
import Button from './ui/Button'

interface BookmarkItem {
  id: string
  title: string
  url: string
  created_at: string
}

export default function BookmarkList({ initialBookmarks, userId }: { initialBookmarks: BookmarkItem[], userId: string }) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(initialBookmarks)
  const supabase = createClient()

  useEffect(() => {
    // Set up Realtime listener
    const channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as BookmarkItem, ...prev])
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, userId])

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from('bookmarks').delete().eq('id', id)
    if (error) {
      console.error('Error deleting bookmark:', error)
    }
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
        <Bookmark className="h-12 w-12 mb-4 opacity-20" />
        <p className="text-lg">No bookmarks yet. Add your first one above!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="group relative flex flex-col p-5 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-blue-100"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-slate-900 truncate pr-8" title={bookmark.title}>
              {bookmark.title}
            </h3>
            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Delete bookmark"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-slate-500 truncate mb-4" title={bookmark.url}>
            {bookmark.url}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-slate-300 font-medium">
              {new Date(bookmark.created_at).toLocaleDateString()}
            </span>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Visit <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
