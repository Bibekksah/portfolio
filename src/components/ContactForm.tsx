import React from 'react'

interface ContactFormProps {
  name: string
  email: string
  message: string
  status: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onMessageChange: (value: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onClose: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  name,
  email,
  message,
  status,
  onNameChange,
  onEmailChange,
  onMessageChange,
  onSubmit,
  onClose,
}) => (
  <div className="mt-4 rounded-[28px] border border-green-500/20 bg-[#011006]/95 p-5 shadow-[inset_0_0_40px_rgba(16,248,94,0.12)]">
    <div className="mb-4 text-green-100 text-lg font-semibold tracking-[0.08em]">
      Secure Contact Form
    </div>
    <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <label className="space-y-2 text-green-100">
        <span className="block text-sm text-green-300">Name</span>
        <input
          type="text"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          className="w-full rounded-2xl border border-green-500/25 bg-black/20 px-3 py-2 text-green-100 outline-none transition focus:border-green-300 focus:ring-2 focus:ring-green-500/20"
          placeholder="Your name"
        />
      </label>
      <label className="space-y-2 text-green-100">
        <span className="block text-sm text-green-300">Email</span>
        <input
          type="email"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          className="w-full rounded-2xl border border-green-500/25 bg-black/20 px-3 py-2 text-green-100 outline-none transition focus:border-green-300 focus:ring-2 focus:ring-green-500/20"
          placeholder="you@example.com"
        />
      </label>
      <label className="lg:col-span-2 space-y-2 text-green-100">
        <span className="block text-sm text-green-300">Message</span>
        <textarea
          value={message}
          onChange={e => onMessageChange(e.target.value)}
          rows={5}
          className="w-full rounded-2xl border border-green-500/25 bg-black/20 px-3 py-2 text-green-100 outline-none transition focus:border-green-300 focus:ring-2 focus:ring-green-500/20"
          placeholder="Write your message here..."
        />
      </label>
      <div className="lg:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-green-400 to-lime-300 px-5 py-2 text-black font-semibold shadow-[0_0_20px_rgba(32,194,14,0.2)] transition hover:opacity-90"
        >
          Send Message
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-green-500/30 px-5 py-2 text-green-200 transition hover:bg-green-500/10"
        >
          Close Form
        </button>
      </div>
      {status && (
        <div className="lg:col-span-2 rounded-2xl border border-green-500/20 bg-[#06220d]/90 px-4 py-3 text-sm text-green-200">
          {status}
        </div>
      )}
    </form>
  </div>
)

export default ContactForm
