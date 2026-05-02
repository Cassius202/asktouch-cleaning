'use client'

import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { sendProfessionalMail } from '../../actions/sendProfessionalEmail'

export default function ProfessionalMail() {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  const format = (command: 'bold' | 'italic') => {
    editorRef.current?.focus()
    document.execCommand(command, false)
  }

  const handleSend = async () => {
    toast.dismiss()

    const body = editorRef.current?.innerHTML ?? ''
    const bodyText = editorRef.current?.innerText?.trim() ?? ''

    if (!to || !subject || !bodyText) {
      toast.error('Please fill in all fields')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    await toast.promise(
      sendProfessionalMail({ to, subject, body }).then(result => {
        if (!result.success) throw new Error(result.message)
        setTo('')
        setSubject('')
        if (editorRef.current) editorRef.current.innerHTML = ''
      }),
      {
        loading: 'Sending email...',
        success: 'Email sent!',
        error: (err) => err.message ?? 'Failed to send email',
      }
    )

    setIsSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">

      {/* To */}
      <div className="relative">
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder=" "
          className="peer w-full h-14 pt-5 pb-2 px-4 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white outline-none focus:border-emerald-500 transition-colors"
        />
        <label className="absolute left-4 top-4 text-sm text-gray-400 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-emerald-600">
          To
        </label>
      </div>

      {/* Subject */}
      <div className="relative">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder=" "
          className="peer w-full h-14 pt-5 pb-2 px-4 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white outline-none focus:border-emerald-500 transition-colors"
        />
        <label className="absolute left-4 top-4 text-sm text-gray-400 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-emerald-600">
          Subject
        </label>
      </div>

      {/* Rich text editor */}
      <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-emerald-500 transition-colors">
        
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-gray-100">
          <button
            type="button"
            onClick={() => format('bold')}
            className="group relative w-7 h-7 flex items-center justify-center rounded text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors bg-green-500/20"
          >
            B
            <span className='tooltip'>bold</span>
          </button>
          <button
            type="button"
            onClick={() => format('italic')}
            className=" group relative w-7 h-7 flex items-center font-serif justify-center rounded text-sm italic text-gray-500 hover:bg-gray-100 transition-colors bg-blue-500/20"
          >
            I
            <span className='tooltip font-sans'>italic</span>
          </button>
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Write your message..."
          className="min-h-[200px] p-4 text-sm text-gray-900 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        />
      </div>

      <button
        onClick={handleSend}
        disabled={isSubmitting}
        className="self-end px-6 h-10 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
      >
        Send email
      </button>
    </div>
  )
}