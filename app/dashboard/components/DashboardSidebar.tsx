"use client"

import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, BarChart3, HardDrive, Database, Globe, Settings, X, Church } from "lucide-react"

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  churchSubdomain: string | string[] | undefined;
  namaGerejaResmi: string;
}

export default function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
  churchSubdomain,
  namaGerejaResmi,
}: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const reservedKeywords = ["settings", "profile"]
  
  // 🚀 DETEKSI RUTE: Menentukan apakah layout sedang menampilkan halaman profil user
  const isProfileRoute = pathname.includes("/dashboard/profile")
  const isInternalRoute = churchSubdomain && reservedKeywords.includes(String(churchSubdomain))

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64 flex-shrink-0 h-full`}>
      <div className="flex flex-col h-full">
        
        {/* Bagian Branding / Header Sidebar */}
        <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
          <div 
            className="inline-flex items-center gap-2.5 cursor-pointer" 
            onClick={() => router.push(churchSubdomain && !isProfileRoute && !isInternalRoute ? `/dashboard/${churchSubdomain}` : "/dashboard")}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white text-lg font-bold">G</span>
            <span className="text-lg font-bold tracking-tight truncate max-w-[140px]">
              {churchSubdomain && !isProfileRoute && !isInternalRoute ? namaGerejaResmi : "Master Control"}
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Menu Navigasi Berdasarkan Rute Dinamis */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {!churchSubdomain || isProfileRoute || isInternalRoute ? (
            <>
              {/* Tampilan Menu Utama Master & Halaman Profil Akun */}
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard`) }} label="Main Overview" icon={LayoutDashboard} active={pathname === "/dashboard"} />
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard?tab=churches`) }} label="Daftar Klien" icon={Church} active={pathname.includes("tab=churches")} />
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard?tab=domains`) }} label="Semua Domain" icon={Globe} active={pathname.includes("tab=domains")} />
            </>
          ) : (
            <>
              {/* Tampilan Menu Cabang Spesifik berdasarkan Subdomain */}
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard/${churchSubdomain}`) }} label="Overview" icon={LayoutDashboard} active={pathname === `/dashboard/${churchSubdomain}`} />
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard/${churchSubdomain}/analytics`) }} label="Analytics" icon={BarChart3} active={pathname === `/dashboard/${churchSubdomain}/analytics`} />
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard/${churchSubdomain}/storage`) }} label="Storage" icon={HardDrive} active={pathname === `/dashboard/${churchSubdomain}/storage`} />
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard/${churchSubdomain}/database`) }} label="Database" icon={Database} active={pathname === `/dashboard/${churchSubdomain}/database`} />
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard/${churchSubdomain}/domains`) }} label="Domains Upgrade" icon={Globe} active={pathname === `/dashboard/${churchSubdomain}/domains`} />
              <SidebarLink onClick={() => { setSidebarOpen(false); router.push(`/dashboard/${churchSubdomain}/settings`) }} label="Hub Settings" icon={Settings} active={pathname === `/dashboard/${churchSubdomain}/settings`} />
            </>
          )}
        </nav>
      </div>
    </aside>
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