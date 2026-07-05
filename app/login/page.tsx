"use client"

import { useState } from "react"
import { Church, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Placeholder untuk implementasi login
      console.log("[v0] Login attempt with:", { email, password })
      
      // Simulasi login
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Redirect atau tampilkan success message
      alert("Login berhasil! (Demo Portal)")
    } catch (err) {
      setError("Terjadi kesalahan saat login. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">Portal Login</h1>
          <p className="text-sm text-muted-foreground">Masuk ke akun GerejaPintar Anda</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@gereja.id"
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan sandi Anda"
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

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border cursor-pointer"
              />
              <span className="text-muted-foreground">Ingat saya</span>
            </label>
            <a href="#" className="text-primary hover:text-primary/80 font-medium">
              Lupa sandi?
            </a>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg"
          >
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">atau</span>
          </div>
        </div>

        {/* Demo Login */}
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-lg"
          onClick={() => {
            setEmail("demo@gerejapintar.id")
            setPassword("demo123456")
          }}
        >
          Coba Login Demo
        </Button>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Belum punya akun?{" "}
            <a href="/register" className="text-primary hover:text-primary/80 font-medium">
              Daftar di sini
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            Butuh bantuan?{" "}
            <a href="mailto:support@gerejapintar.id" className="text-primary hover:text-primary/80 font-medium">
              Hubungi Support
            </a>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-lg bg-secondary/30 border border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Portal Demo:</strong> Gunakan email dan sandi apapun untuk demo. Data tidak disimpan. Untuk akses penuh, hubungi{" "}
            <a href="mailto:contact@gerejapintar.id" className="text-primary hover:text-primary/80 font-medium">
              contact@gerejapintar.id
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
