"use client"

import { MessageCircle } from "lucide-react"

export default function FloatingIcon() {
  return (
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition-colors"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Hubungi Support</span>
    </a>
  )
}