'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Button from './ui/Button'
import Input from './ui/Input'
import { Plus } from 'lucide-react'

export default function AddBookmarkForm({ userId }: { userId: string }) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || !title) return

    setIsLoading(true)
    const { error } = await supabase.from('bookmarks').insert([
      { url, title, user_id: userId }
    ])

    setIsLoading(false)
    if (error) {
      alert('Error adding bookmark: ' + error.message)
    } else {
      setUrl('')
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        <Input
          label="Title"
          placeholder="e.g. My Favorite Recipe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="URL"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button type="submit" isLoading={isLoading} className="w-full md:w-auto mt-1 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Bookmark
        </Button>
      </div>
    </form>
  )
}
