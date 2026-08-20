"use client"

import { useEffect } from "react"
import { StatusCodePage } from "@/components/status-code-page"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Global application error:", error)
  }, [error])

  return (
    <html lang="id">
      <body>
        <StatusCodePage
          code={500}
          title="Kesalahan Sistem"
          description="Aplikasi mengalami gangguan yang tidak terduga. Coba lagi atau kembali ke beranda."
          onRetry={reset}
        />
      </body>
    </html>
  )
}
