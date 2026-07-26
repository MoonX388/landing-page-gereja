"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import DashboardHeader from "./components/DashboardHeader"
import DashboardSidebar from "./components/DashboardSidebar" // 🚀 IMPORT SIDEBAR BARU

export default function GlobalDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [subdomainValid, setSubdomainValid] = useState<boolean | null>(null)
  const [namaGerejaResmi, setNamaGerejaResmi] = useState<string>("")
  
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const { user, loading, logout } = useAuth() as any
  
  const churchSubdomain = params?.subdomain 
  const reservedKeywords = ["settings", "profile"]

  // 🛡️ 1. SATPAM OTENTIKASI: Kunci halaman jika token sesi kosong
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // 🛡️ 2. KONTROL VALIDASI MULTI-TENANT
  useEffect(() => {
    if (loading || !user) return

    if (user.role === "admin") {
      const targetSub = user.subdomain || user.churchSubdomain || "demo"
      const targetUrl = `https://${targetSub}.gerejapintar.id/admin`
      if (typeof window !== "undefined" && window.location.href !== targetUrl) {
        window.location.href = targetUrl
      }
      return
    }

    if (pathname.includes("/dashboard/profile")) {
      setSubdomainValid(true)
      return
    }

    if ((user.role === "admin_gereja" || user.role === "sub_owner") && !churchSubdomain) {
      if (user.subdomain) {
        const targetPath = `/dashboard/${user.subdomain}`
        if (pathname !== targetPath) {
          router.push(targetPath)
        }
      } else {
        setSubdomainValid(false)
      }
      return
    }

    if ((user.role === "admin_gereja" || user.role === "sub_owner") && churchSubdomain && user.subdomain !== churchSubdomain) {
      const targetPath = `/dashboard/${user.subdomain}`
      if (pathname !== targetPath) {
        router.push(targetPath)
      }
      return
    }

    if (!churchSubdomain || reservedKeywords.includes(String(churchSubdomain))) {
      setSubdomainValid(true)
      return
    }

    fetch(`https://api.gerejapintar.id/auth/check-subdomain/${churchSubdomain}`)
      .then((res) => {
        if (!res.ok) throw new Error("Subdomain palsu")
        return res.json()
      })
      .then((data) => {
        setSubdomainValid(true)
        setNamaGerejaResmi(data.namaGereja)
      })
      .catch(() => {
        setSubdomainValid(false) 
      })
      
  }, [churchSubdomain, pathname, user?.role, user?.subdomain, loading, router])

  if (loading || (subdomainValid === null && user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Menghubungkan enkripsi panel...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role === "admin") return null

  // Tampilan layar Intersepsi 404
  if (subdomainValid === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 text-center font-sans">
        <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-full mb-4 animate-bounce">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">404 - Hub Tidak Ditemukan</h1>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Maaf, alamat kontrol instansi <strong className="text-red-600 font-mono">/dashboard/{churchSubdomain || ""}</strong> tidak terdaftar.
        </p>
      </div>
    )
  }

  const isProfileRoute = pathname.includes("/dashboard/profile")
  const isInternalRoute = churchSubdomain && reservedKeywords.includes(String(churchSubdomain))

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      
      {/* Overlay Backdrop Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* 🚀 INTEGRASI COMPONENT SIDEBAR UTUH */}
      <DashboardSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        churchSubdomain={churchSubdomain}
        namaGerejaResmi={namaGerejaResmi}
      />

      {/* Konten Utama Sebelah Kanan */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <DashboardHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          logout={logout}
          dashboardId={isProfileRoute ? undefined : churchSubdomain}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  )
}