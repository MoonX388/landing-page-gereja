"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ShieldAlert, LayoutDashboard, BarChart3, HardDrive, Database, Globe, Settings, LogOut, Menu, X, Church, Users } from "lucide-react"

export default function GlobalDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [subdomainValid, setSubdomainValid] = useState<boolean | null>(null)
  const [namaGerejaResmi, setNamaGerejaResmi] = useState<string>("")
  
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const { user, loading, logout } = useAuth() as any
  
  const dashboardId = params?.id

  // 🛡️ 1. SATPAM OTENTIKASI: Tendang jika tidak login
  useEffect(() => {
    if (!loading && !user) router.push("/login")
  }, [user, loading, router])

  // 🛡️ 2. SATPAM OTORISASI ROLE & VALIDASI SUBDOMAIN
  useEffect(() => {
    if (loading || !user) return

    // HACK PROTEKSI: Jika admin biasa nekat masuk ke /dashboard (tanpa ID)
    if (user.role === "admin_gereja" && !dashboardId) {
      router.push(`/dashboard/${user.subdomain}`)
      return
    }

    // Jika yang masuk adalah Super Admin di dashboard utama
    if (!dashboardId) {
      setSubdomainValid(true)
      return
    }

    // Tembak API Cek Validitas Subdomain
    fetch(`https://api.gerejapintar.id/auth/check-subdomain/${dashboardId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Subdomain tidak terdaftar")
        return res.json()
      })
      .then((data) => {
        setSubdomainValid(true)
        setNamaGerejaResmi(data.namaGereja)
      })
      .catch(() => {
        setSubdomainValid(false) 
      })
  }, [dashboardId, user, loading, router])

  if (loading || (subdomainValid === null && user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Memverifikasi enkripsi layanan...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  // 🛑 TAMPILAN ERROR 404 JIKA SUBDOMAIN PALSU / EXPIRED
  if (subdomainValid === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-sans">
        <div className="p-4 bg-red-50 text-red-600 rounded-full mb-4 animate-bounce">
          <ShieldAlert className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">404 - Hub Tidak Ditemukan</h1>
        <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto">
          Maaf, alamat subdomain <strong className="text-gray-900">{dashboardId}.gerejapintar.id</strong> belum terdaftar atau masa langganannya telah kedaluwarsa di platform kami.
        </p>
        <div className="mt-6">
          <Button onClick={() => window.location.href = "https://gerejapintar.id"} className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl px-6 py-2.5 shadow-sm">
            Kembali ke Beranda Utama
          </Button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout()
      router.push("/login")
    }
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* ── SIDEBAR NAVIGASI ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64 flex-shrink-0 h-full`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-5 border-b border-gray-800">
            <div className="inline-flex items-center gap-2.5 cursor-pointer" onClick={() => router.push(dashboardId ? `/dashboard/${dashboardId}` : "/dashboard")}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white text-lg font-bold">G</span>
              <span className="text-lg font-bold tracking-tight truncate max-w-[170px]">
                {dashboardId ? namaGerejaResmi : "Master Admin"}
              </span>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {/* KONDISI MENU BERDASARKAN LEVEL USER */}
            {!dashboardId ? (
              <>
                {/* Menu Khusus Super Admin */}
                <SidebarLink onClick={() => router.push(`/dashboard`)} label="Main Overview" icon={LayoutDashboard} active={pathname === "/dashboard"} />
                <SidebarLink onClick={() => router.push(`/dashboard?tab=churches`)} label="Daftar Klien" icon={Church} active={pathname.includes("tab=churches")} />
                <SidebarLink onClick={() => router.push(`/dashboard?tab=domains`)} label="Semua Domain" icon={Globe} active={pathname.includes("tab=domains")} />
              </>
            ) : (
              <>
                {/* Menu Khusus Admin Tenant/Gereja */}
                <SidebarLink onClick={() => router.push(`/dashboard/${dashboardId}`)} label="Overview" icon={LayoutDashboard} active={pathname === `/dashboard/${dashboardId}`} />
                <SidebarLink onClick={() => router.push(`/dashboard/${dashboardId}/analytics`)} label="Analytics" icon={BarChart3} active={pathname === `/dashboard/${dashboardId}/analytics`} />
                <SidebarLink onClick={() => router.push(`/dashboard/${dashboardId}/storage`)} label="Storage" icon={HardDrive} active={pathname === `/dashboard/${dashboardId}/storage`} />
                <SidebarLink onClick={() => router.push(`/dashboard/${dashboardId}/database`)} label="Database" icon={Database} active={pathname === `/dashboard/${dashboardId}/database`} />
                <SidebarLink onClick={() => router.push(`/dashboard/${dashboardId}/domains`)} label="Domains" icon={Globe} active={pathname === `/dashboard/${dashboardId}/domains`} />
                <SidebarLink onClick={() => router.push(`/dashboard/${dashboardId}/settings`)} label="Settings" icon={Settings} active={pathname === `/dashboard/${dashboardId}/settings`} />
              </>
            )}
          </nav>

          <div className="px-4 py-6 border-t border-gray-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── AREA KONTEN UTAMA ── */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-600 dark:text-gray-300">
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                  {user?.namaAdmin?.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.namaAdmin || "Admin"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email} ({user?.role})</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarLink({ onClick, label, active = false, icon: Icon }: { onClick: () => void; label: string; active?: boolean; icon: React.ComponentType<{ className: string }> }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span>{label}</span>
    </button>
  )
}