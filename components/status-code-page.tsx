"use client"

import { ArrowLeft, Home, RefreshCw, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

type StatusCodePageProps = {
  code: number
  title: string
  description: string
  actionLabel?: string
  onRetry?: () => void
}

export function StatusCodePage({
  code,
  title,
  description,
  actionLabel = "Kembali ke Beranda",
  onRetry,
}: StatusCodePageProps) {
  const isSuccess = code >= 200 && code < 300
  const isClientError = code >= 400 && code < 500
  const tone = isSuccess
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : isClientError
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-red-200 bg-red-50 text-red-700"

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
        <div className={`mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border ${tone}`}>
          {isSuccess ? <Home className="h-10 w-10" /> : <ShieldAlert className="h-10 w-10" />}
        </div>
        <p className="font-mono text-7xl font-bold tracking-tight text-foreground">{code}</p>
        <h1 className="mt-5 text-3xl font-serif font-bold text-foreground">{title}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80">
            <Home className="h-4 w-4" />
            {actionLabel}
          </a>
          {onRetry ? (
            <Button type="button" variant="outline" className="rounded-lg" onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Coba Lagi
            </Button>
          ) : (
            <a href="/status-sistem" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-all hover:bg-muted">
              <ArrowLeft className="h-4 w-4" />
              Status Sistem
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
