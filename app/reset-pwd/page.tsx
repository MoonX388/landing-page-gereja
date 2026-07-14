// client_side/app/reset-pwd/page.tsx
"use client"

import { useState, Suspense } from "react" // 🚀 1. Import Suspense dari react
import { useSearchParams, useRouter } from "next/navigation"
import { Church, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"

// 🚀 2. Pindahkan logika form ke dalam komponen terpisah
function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Konfirmasi sandi tidak cocok.")
      return
    }

    setLoading(true)
    try {
      await api.post("/auth/reset-password", { token, newPassword: password })
      setSuccess(true)
      setTimeout(() => router.push("/login"), 2500)
    } catch (err: any) {
      setError(err.response?.data?.message || "Tautan tidak valid atau kedaluwarsa.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center w-full">
        <h2 className="text-2xl font-bold text-green-500 mb-2">Sandi Diperbarui!</h2>
        <p className="text-muted-foreground">Kata sandi baru berhasil disimpan. Anda akan dialihkan ke halaman login...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Sandi Baru</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Konfirmasi Sandi Baru</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Ulangi sandi baru"
          required
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
        />
      </div>

      {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : "Perbarui Kata Sandi"}
      </Button>
    </form>
  )
}

// 🚀 3. Halaman Utama sekarang bertugas sebagai penyedia Suspense Boundary
export default function ResetSandiPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="bg-card p-8 rounded-2xl shadow-lg border border-border max-w-md w-full flex flex-col items-center">
        <div className="text-center mb-6 w-full">
          <div className="inline-flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Church className="h-6 w-6" />
            </span>
            <span className="text-2xl font-bold text-foreground">
              Gereja<span className="text-accent-foreground">Pintar</span>
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mt-4">Sandi Baru</h1>
          <p className="text-sm text-muted-foreground">Masukkan kata sandi baru untuk akun administrator Anda.</p>
        </div>

        {/* 🚀 KUNCI PERBAIKAN: Bungkus komponen di dalam Suspense */}
        <Suspense fallback={<div className="text-center text-sm text-muted-foreground">Memuat halaman reset...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
