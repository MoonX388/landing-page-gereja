"use client"

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
  Users,
} from "lucide-react"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation" // Ditambahkan useParams & useRouter
import { useAuth } from "../../context/AuthContext" // Hubungkan ke Auth Context Anda
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  
  // 1. Ambil params ID dari URL dan data user + fungsi logout dari Context
  const params = useParams()
  const { user, logout } = useAuth()
  
  const dashboardId = params?.id // Ini adalah ID yang ada di URL (misal: /dashboard/123)

  // 2. Fungsi Logout Nyata terintegrasi dengan Context backend
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout()
      router.push("/login")
    }
  }

  // Membuat inisial avatar secara dinamis dari nama admin
  const getInitials = (name: string) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Nama Gereja Dinamis */}
          <div className="px-6 py-5 border-b border-gray-800">
            <a href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white text-lg font-bold">
                G
              </span>
              <span className="text-lg font-bold tracking-tight">
                {user?.namaGereja || "GerejaPintar"}
              </span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <SidebarLink href="#" label="Overview" icon={LayoutDashboard} active />
            <SidebarLink href="#" label="Analytics" icon={BarChart3} />
            <SidebarLink href="#" label="Storage" icon={HardDrive} />
            <SidebarLink href="#" label="Database" icon={Database} />
            <SidebarLink href="#" label="Usage" icon={Gauge} />
            <SidebarLink href="#" label="Domains" icon={Globe} />
            <SidebarLink href="#" label="Settings" icon={Settings} />
            <SidebarLink href="#" label="Support" icon={LifeBuoy} />
          </nav>

          {/* Bottom */}
          <div className="px-4 py-6 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-600 dark:text-gray-300"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <div className="relative hidden sm:block max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari sesuatu..."
                  className="pl-9 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-300">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
              </Button>

              {/* Data Profil Admin Dinamis dari Backend */}
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-gray-200 dark:border-gray-700">
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                    {getInitials(user?.namaAdmin)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.namaAdmin || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email || "Email tidak tersedia"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard ID: <span className="text-blue-600">#{dashboardId}</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Selamat datang kembali di panel kendali {user?.namaGereja || "Gereja Anda"}.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Pengunjung" value="12.847" icon={Users} trend="+12%" trendUp description="minggu ini" />
              <StatCard title="Storage Terpakai" value="4.2 GB" icon={HardDrive} trend="+8%" trendUp description="dari 10 GB" />
              <StatCard title="Database" value="3.8 GB" icon={Database} trend="+5%" trendUp description="ukuran total" />
              <StatCard title="Domain Aktif" value="7" icon={Globe} trend="2" trendUp description="baru bulan ini" />
            </div>

            {/* Analytics + Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-sm border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Aktivitas 7 Hari Terakhir</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {[65, 78, 90, 85, 72, 95, 80].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-500 rounded-md transition-all" style={{ height: `${height}%` }} />
                        <span className="text-xs text-gray-400">{["Sen","Sel","Rab","Kam","Jum","Sab","Min"][i]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Penggunaan Saat Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <UsageItem label="CPU" value="32%" color="bg-blue-500" />
                  <UsageItem label="Memory" value="58%" color="bg-green-500" />
                  <UsageItem label="Storage" value="42%" color="bg-yellow-500" />
                  <UsageItem label="Bandwidth" value="27%" color="bg-purple-500" />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

// ===== Komponen Pendukung Tetap Sama =====
function SidebarLink({ href, label, active = false, icon: Icon }: { href: string; label: string; active?: boolean; icon: React.ComponentType<{ className: string }> }) {
  return (
    <a href={href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span>{label}</span>
    </a>
  )
}

function StatCard({ title, value, icon: Icon, trend, trendUp, description }: { title: string; value: string; icon: React.ComponentType<{ className: string }>; trend: string; trendUp: boolean; description: string }) {
  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function UsageItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
      </div>
      <div className="mt-1 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: value }} />
      </div>
    </div>
  )
}