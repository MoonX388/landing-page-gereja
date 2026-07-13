// client_side/app/verify-email/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Sedang memverifikasi akun Anda...")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Token verifikasi tidak ditemukan.")
      return
    }

    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email?token=${token}`)
        setStatus("success")
        setMessage(res.data.message || "Email Anda sukses diverifikasi!")
      } catch (err: any) {
        setStatus("error")
        setMessage(err.response?.data?.message || "Tautan verifikasi tidak valid atau kedaluwarsa.")
      }
    }

    verify()
  }, [token])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-card p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-border">
        {status === "loading" && (
          <>
            <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">Memproses Verifikasi</h2>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">Verifikasi Berhasil!</h2>
            <p className="text-muted-foreground mt-2">{message}</p>
            <Button className="mt-6 w-full" asChild>
              <Link href="/login">Masuk Sekarang</Link>
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-destructive">Verifikasi Gagal</h2>
            <p className="text-muted-foreground mt-2">{message}</p>
            <Button className="mt-6 w-full" variant="outline" asChild>
              <Link href="/register">Daftar Ulang</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
