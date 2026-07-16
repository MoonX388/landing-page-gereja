// client_side/app/forgot-pwd/page.tsx
"use client"

import { useState } from "react"
import { Church, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation" // 🚀 Tambahkan useRouter untuk navigasi aman
import Link from "next/link"
import api from "@/lib/api"

export default function LupaSandiPage() {
  const router = useRouter() // 🚀 Inisialisasi router
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Menembak API Asli Backend NestJS
      await api.post("/auth/forgot-password", { email })
      setSubmitted(true)
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengirim permintaan reset. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-card p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-border">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground">Cek Email Anda</h2>
          <p className="text-muted-foreground mt-2">
            Tautan instruksi penyetelan ulang sandi berhasil dikirim ke email <strong>{email}</strong>. Silakan periksa kotak masuk atau folder spam Anda.
          </p>
          {/* 🚀 FIXED: Ganti asChild dengan onClick router agar bebas crash TypeScript */}
          <Button 
            className="mt-6 w-full rounded-lg" 
            onClick={() => router.push("/login")}
          >
            Kembali ke Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="bg-card p-8 rounded-2xl shadow-lg border border-border max-w-md w-full">
        <div className="text-center mb-6">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Church className="h-6 w-6" />
            </span>
            <span className="text-2xl font-bold text-foreground">
              Gereja<span className="text-accent-foreground">Pintar</span>
            </span>
          </a>
          <h1 className="text-2xl font-semibold text-foreground mt-4">Lupa Sandi</h1>
          <p className="text-sm text-muted-foreground">
            Masukkan email Anda, kami akan kirim tautan reset.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              Email Akun
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@gereja.id"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full rounded-lg">
            {loading ? "Mengirim..." : "Kirim Tautan Reset"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Sudah ingat? <Link href="/login" className="text-primary hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  )
}