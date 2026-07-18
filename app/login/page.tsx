"use client"

import { useState, useEffect } from "react"
import { Church, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { demo } from "@/lib/all-link"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth() 
  
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  useEffect(() => {
    const savedUsername = localStorage.getItem("remembered_username")
    if (savedUsername) {
      setUsername(savedUsername)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const loggedInUser = (await login({ username, password })) as any

      if (rememberMe) {
        localStorage.setItem("remembered_username", username)
      } else {
        localStorage.removeItem("remembered_username")
      }

      // 🚀 KUNCI PERBAIKAN: Arahkan berdasarkan Role dari Database
      if (loggedInUser && loggedInUser.role === 'super_admin') {
        // Master Admin dialihkan ke rute bersih /dashboard
        router.push('/dashboard')
      } else if (loggedInUser && loggedInUser.subdomain) {
        // Admin Gereja dialihkan ke /dashboard/nama-subdomain mereka
        router.push(`/dashboard/${loggedInUser.subdomain}`)
      } else {
        throw new Error("Hak akses atau alamat subdomain akun tidak valid.")
      }

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    window.location.href = demo.defaults.baseURL + "/login"
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nama@gereja.id"
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

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
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border cursor-pointer"
              />
              <span className="text-muted-foreground">Ingat saya</span>
            </label>
            <a href="/forgot-pwd" className="text-primary hover:text-primary/80 font-medium">
              Lupa sandi?
            </a>
          </div>

          <Button type="submit" disabled={loading} className="w-full rounded-lg">
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">atau</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full rounded-lg"
          onClick={handleDemoLogin}
        >
          Coba Login Demo → demo.gerejapintar.id
        </Button>

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
      </div>
    </div>
  )
}