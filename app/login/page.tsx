"use client"

import { useState } from "react"
import { Church, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulasi login
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Jika rememberMe, simpan di localStorage (contoh)
      if (rememberMe) {
        localStorage.setItem("remembered_email", email)
      } else {
        localStorage.removeItem("remembered_email")
      }

      // Redirect ke dashboard (atau halaman utama)
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  // Demo login - langsung redirect ke demo.gerejapintar.id
  const handleDemoLogin = () => {
    window.location.href = "https://demo.gerejapintar.id"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <a href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                <Church className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Gereja<span className="text-blue-600">Pintar</span>
              </span>
            </a>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Selamat Datang Kembali</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Masuk ke akun GerejaPintar Anda</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@gereja.id"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600 dark:text-gray-300">Ingat saya</span>
              </label>
              <a href="/lupa-sandi" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                Lupa sandi?
              </a>
            </div>

            <Button type="submit" disabled={loading} className="w-full rounded-xl py-2.5">
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400">atau</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl border-blue-200 dark:border-blue-800 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={handleDemoLogin}
          >
            Coba Login Demo → demo.gerejapintar.id
          </Button>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Daftar di sini
            </a>
          </div>

          <div className="mt-4 text-center text-xs text-gray-400">
            Butuh bantuan?{" "}
            <a href="mailto:support@gerejapintar.id" className="text-blue-600 hover:text-blue-700 font-medium">
              Hubungi Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
