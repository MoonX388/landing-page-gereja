// app/dashboard/layout.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  LayoutDashboard,
  BarChart3,
  HardDrive,
  Database,
  Gauge,
  Globe,
  Settings,
  LifeBuoy,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  Church,
} from "lucide-react"

export default function GlobalDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const { user, loading, logout } = useAuth()
  
  const dashboardId = params?.id // Will be undefined if on exact `/dashboard`

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

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

  if (!user) return null

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout()
      router.push("/login")
    }
  }

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64 flex-shrink-0 h-full`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-5 border-b border-gray-800">
            <div className="inline-flex items-center gap-2.5 cursor-pointer" onClick={() => router.push("/dashboard")}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white text-lg font-bold">G</span>
              <span className="text-lg font-bold tracking-tight">
                {dashboardId ? user?.namaGereja : "GerejaPintar Pusat"}
              </span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {/* 🚀 JIKA DI RUTE /dashboard (MASTER ADMIN VIEW) */}
            {!dashboardId ? (
              <>
                <SidebarLink onClick={() => router.push(`/dashboard`)} label="Main Overview" icon={LayoutDashboard} active={pathname === "/dashboard"} />
                <SidebarLink onClick={() => router.push(`/dashboard?tab=gereja`)} label="Daftar Gereja" icon={Church} active={pathname === "/dashboard" && !sidebarOpen} />
                <SidebarLink onClick={() => router.push(`/dashboard?tab=domains`)} label="Semua Domain" icon={Globe} active={false} />
                <SidebarLink onClick={() => router.push(`/dashboard?tab=system`)} label="Status Server" icon={Gauge} active={false} />
              </>
            ) : (
              // 🚀 JIKA DI RUTE /dashboard/[id] (CHURCH SPECIFIC VIEW)
              <>
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

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-4 flex-1">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-600 dark:text-gray-300">
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="relative hidden sm:block max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="text" placeholder="Cari data gereja/domain..." className="pl-9 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg text-sm" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-300">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-gray-200 dark:border-gray-700">
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">{getInitials(user?.namaAdmin)}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.namaAdmin || "Master Admin"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full h-full">
          {children}
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
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