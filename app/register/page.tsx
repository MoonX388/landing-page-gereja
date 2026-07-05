"use client"

import { useState } from "react"
import { Church, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    namaGereja: "",
    email: "",
    password: "",
    confirmPassword: "",
    namaAdmin: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Sandi tidak cocok")
        setLoading(false)
        return
      }

      if (formData.password.length < 8) {
        setError("Sandi harus minimal 8 karakter")
        setLoading(false)
        return
      }

      console.log("[v0] Register attempt:", {
        namaGereja: formData.namaGereja,
        email: formData.email,
        namaAdmin: formData.namaAdmin,
      })

      await new Promise(resolve => setTimeout(resolve, 800))

      setSuccess(true)
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    } catch (err) {
      setError("Terjadi kesalahan saat pendaftaran. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Pendaftaran Berhasil</h2>
            <p className="text-muted-foreground">Akun Anda telah dibuat. Anda akan dialihkan ke login dalam beberapa saat...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Church className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Gereja<span className="text-accent-foreground">Pintar</span>
            </span>
          </a>
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">Daftar Sekarang</h1>
          <p className="text-sm text-muted-foreground">Buat akun GerejaPintar untuk gereja Anda</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Gereja */}
          <div>
            <label htmlFor="namaGereja" className="block text-sm font-medium text-foreground mb-2">
              Nama Gereja
            </label>
            <input
              id="namaGereja"
              name="namaGereja"
              type="text"
              value={formData.namaGereja}
              onChange={handleChange}
              placeholder="Gereja Bethel Indonesia"
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Nama Admin */}
          <div>
            <label htmlFor="namaAdmin" className="block text-sm font-medium text-foreground mb-2">
              Nama Admin
            </label>
            <input
              id="namaAdmin"
              name="namaAdmin"
              type="text"
              value={formData.namaAdmin}
              onChange={handleChange}
              placeholder="Nama lengkap Anda"
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@gereja.id"
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Konfirmasi Sandi
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Masukkan sandi lagi"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showConfirmPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Terms Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              required
              className="h-4 w-4 rounded border-border cursor-pointer"
            />
            <span className="text-sm text-muted-foreground">
              Saya setuju dengan{" "}
              <a href="/syarat-layanan" className="text-primary hover:text-primary/80 font-medium">
                Syarat Layanan
              </a>
              {" "}dan{" "}
              <a href="/kebijakan-privasi" className="text-primary hover:text-primary/80 font-medium">
                Kebijakan Privasi
              </a>
            </span>
          </label>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg"
          >
            {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
          </Button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <a href="/login" className="text-primary hover:text-primary/80 font-medium">
              Login di sini
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Butuh bantuan?{" "}
            <a href="mailto:support@gerejapintar.id" className="text-primary hover:text-primary/80 font-medium">
              Hubungi Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
