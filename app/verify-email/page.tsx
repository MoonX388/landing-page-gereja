// client_side/app/verify-email/page.tsx
"use client"

import { useEffect, useState, Suspense } from "react" // 🚀 Import Suspense dari react
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

// 🚀 1. Pindahkan logika pengambilan query dan tembak API ke komponen terpisah
function VerifyEmailContent() {
  const searchParams = useSearchParams()
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
        setMessage(err.response?.data?.message || "Tautan verifikasi tidak valid atau telah kedaluwarsa.")
      }
    }

    verify()
  }, [token])

  return (
    <>
      {status === "loading" && (
        <div className="flex flex-col items-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
          <h2 className="text-2xl font-semibold text-foreground">Memproses Verifikasi</h2>
          <p className="text-muted-foreground mt-2">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold text-foreground">Verifikasi Berhasil!</h2>
          <p className="text-muted-foreground mt-2">{message}</p>
          <Button className="mt-6 w-full rounded-lg" asChild>
            <Link href="/login">Masuk Sekarang</Link>
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center">
          <XCircle className="h-16 w-16 text-destructive mb-4" />
          <h2 className="text-2xl font-semibold text-destructive">Verifikasi Gagal</h2>
          <p className="text-muted-foreground mt-2">{message}</p>
          <Button className="mt-6 w-full rounded-lg" variant="outline" asChild>
            <Link href="/register">Daftar Ulang</Link>
          </Button>
        </div>
      )}
    </>
  )
}

// 🚀 2. Komponen Utama yang diexport bertugas membungkus Content dengan Suspense Boundary
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-card p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-border">
        
        {/* 🚀 KUNCI UTAMA: Semua komponen yang memanggil useSearchParams wajib di dalam Suspense */}
        <Suspense 
          fallback={
            <div className="flex flex-col items-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <h2 className="text-xl font-semibold text-foreground">Menyiapkan Halaman...</h2>
            </div>
          }
        >
          <VerifyEmailContent />
        </Suspense>

      </div>
    </div>
  )
}
