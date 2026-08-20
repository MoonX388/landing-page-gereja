"use client"

import { useEffect } from "react"
import { StatusCodePage } from "@/components/status-code-page"

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Root application error:", error)
  }, [error])

  return (
    <StatusCodePage
      code={500}
      title="Terjadi Kesalahan"
      description="Halaman mengalami gangguan. Coba muat ulang atau kembali ke beranda."
      onRetry={reset}
    />
  )
}
