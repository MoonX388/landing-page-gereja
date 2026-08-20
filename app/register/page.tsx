"use client"

import { useState } from "react"
import { Church, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // State untuk multi-step form (Maks 4)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    namaGereja: "",
    provinsi: "",
    kabupatenKota: "",
    namaAdmin: "",
    username: "",
    noHpAdmin: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setError("")
    // Validasi sederhana per langkah
    if (step === 1 && (!formData.namaGereja || !formData.provinsi || !formData.kabupatenKota)) {
      setError("Harap isi semua informasi instansi")
      return
    }
    if (step === 2 && (!formData.namaAdmin || !formData.username || !formData.noHpAdmin)) {
      setError("Harap isi semua informasi admin")
      return
    }
    if (step === 3) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError("Harap isi info keamanan")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Sandi tidak cocok")
        return
      }
      if (formData.password.length < 8) {
        setError("Sandi harus minimal 8 karakter")
        return
      }
    }
    setStep(prev => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setError("")
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Sesuaikan payload API dengan data baru
      await api.post("/auth/register", {
        namaGereja: formData.namaGereja,
        provinsi: formData.provinsi,
        kabupatenKota: formData.kabupatenKota,
        namaAdmin: formData.namaAdmin,
        username: formData.username,
        noHpAdmin: formData.noHpAdmin,
        email: formData.email,
        password: formData.password,
      })

      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Pendaftaran gagal.")
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
              <CheckCircle2 className="h-8 w-8 text-green-600" />
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
          <p className="text-sm text-muted-foreground">Langkah {step} dari 4</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="space-y-4">
          
          {/* LANGKAH 1: Info Instansi */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Gereja</label>
                <input name="namaGereja" type="text" value={formData.namaGereja} onChange={handleChange} placeholder="Contoh: Gereja Bethel Indonesia" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Provinsi</label>
                  <input name="provinsi" type="text" value={formData.provinsi} onChange={handleChange} placeholder="Contoh: DKI Jakarta" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Kabupaten / Kota</label>
                  <input name="kabupatenKota" type="text" value={formData.kabupatenKota} onChange={handleChange} placeholder="Contoh: Jakarta Selatan" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
                </div>
              </div>
            </div>
          )}

          {/* LANGKAH 2: Info Admin */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap Admin</label>
                <input name="namaAdmin" type="text" value={formData.namaAdmin} onChange={handleChange} placeholder="Nama lengkap Anda" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Pengguna (Username)</label>
                <input name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Contoh: admin_gbi" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">No. HP Admin (WA Aktif)</label>
                <input name="noHpAdmin" type="tel" value={formData.noHpAdmin} onChange={handleChange} placeholder="Contoh: 081234567890" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
            </div>
          )}

          {/* LANGKAH 3: Keamanan */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Gereja</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="admin@gereja.id" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Sandi</label>
                <div className="relative">
                  <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Minimal 8 karakter" className="w-full px-4 py-2 rounded-lg border border-border bg-background pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Konfirmasi Sandi</label>
                <div className="relative">
                  <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="Masukkan sandi lagi" className="w-full px-4 py-2 rounded-lg border border-border bg-background pr-10" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LANGKAH 4: Konfirmasi & Syarat */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-4 bg-muted rounded-lg text-sm space-y-2">
                <p><strong>Gereja:</strong> {formData.namaGereja}</p>
                <p><strong>Wilayah:</strong> {formData.kabupatenKota}, {formData.provinsi}</p>
                <p><strong>Admin:</strong> {formData.namaAdmin} ({formData.noHpAdmin})</p>
                <p><strong>Email:</strong> {formData.email}</p>
              </div>

              <label className="flex items-start gap-2 cursor-pointer mt-4">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-border cursor-pointer" />
                <span className="text-sm text-muted-foreground">
                  Saya menyetujui data di atas adalah benar dan menyetujui{" "}
                  <a href="/syarat-layanan" className="text-primary hover:underline">Syarat Layanan</a> serta{" "}
                  <a href="/kebijakan-privasi" className="text-primary hover:underline">Kebijakan Privasi</a>.
                </span>
              </label>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          {/* Navigasi Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep} className="w-1/3">
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
              </Button>
            )}
            
            {step < 4 ? (
              <Button type="button" onClick={nextStep} className={step > 1 ? "w-2/3" : "w-full"}>
                Lanjut <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={loading} className="w-2/3">
                {loading ? "Mendaftarkan..." : "Selesaikan Pendaftaran"}
              </Button>
            )}
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <a href="/login" className="text-primary hover:text-primary/80 font-medium">Login di sini</a>
          </p>
        </div>
      </div>
    </div>
  )
}