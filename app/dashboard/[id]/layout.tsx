"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../context/AuthContext" // Sesuaikan path ini dengan letak AuthContext Anda (misal: @/context/AuthContext)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Jika proses loading cek token selesai dan ternyata user TIDAK ADA (null)
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // 1. Tampilkan loading spinner saat aplikasi sedang memeriksa token di localStorage
  // Ini penting agar konten dashboard tidak berkedip (flash) sebelum mental ke halaman login
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Memverifikasi sesi...</p>
        </div>
      </div>
    )
  }

  // 2. Jika proses loading selesai dan user memang kosong (menunggu proses router.push berjalan)
  // Kita kembalikan null agar halaman dashboard di bawahnya tidak sempat me-render apapun
  if (!user) {
    return null
  }

  // 3. Jika user terverifikasi sudah login, render struktur dashboard
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      {/* Tempat Desain Sidebar / Navbar Dashboard Anda di Sini 
        Contoh struktur umum:
        <Sidebar />
      */}
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* <Header /> */}
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}