"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react"

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: any;
  logout: () => void;
  dashboardId: string | string[] | undefined;
}

export default function DashboardHeader({ sidebarOpen, setSidebarOpen, user, logout, dashboardId }: DashboardHeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem pusat?")) {
      logout()
      router.push("/login")
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-600 dark:text-gray-300 p-1 rounded-lg hover:bg-gray-100">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        <div className="flex items-center gap-3 ml-auto relative" ref={dropdownRef}>
          <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 text-left transition-colors focus:outline-none">
            <Avatar className="h-8 w-8 border border-gray-200">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                {user?.namaAdmin?.charAt(0).toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-gray-900 dark:text-white">{user?.namaAdmin || "Admin"}</p>
              <p className="text-[10px] text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.namaAdmin}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <div className="p-1 space-y-0.5">
                
                {/* MENU 1: PROFIL SAYA (Aman Menuju /dashboard/profile/id) */}
                <button 
                  onClick={() => { setProfileDropdownOpen(false); router.push(`/dashboard/profile/${user?.id || 'me'}`); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <User className="h-4 w-4 text-gray-400" /> Profil Saya
                </button>

                {/* MENU 2: PENGATURAN HUB (Diperbaiki agar dinamis menuju subdomain tujuan) */}
                <button 
                  onClick={() => { 
                    setProfileDropdownOpen(false); 
                    
                    // 🚀 SOLUSI AKURAT: 
                    // Jika Super Admin sedang mengintip hub klien, gunakan string ID dari URL (dashboardId).
                    // Jika sedang di beranda utama atau bagi admin_gereja, langsung gunakan subdomain miliknya sendiri (user.subdomain).
                    const targetSubdomain = dashboardId || user?.subdomain;
                    
                    if (targetSubdomain && targetSubdomain !== "undefined") {
                      router.push(`/dashboard/${targetSubdomain}/settings`);
                    } else {
                      // Kondisi cadangan ekstrem jika data kuki sesi lambat dimuat
                      router.push("/dashboard");
                    }
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-400" /> Pengaturan Hub
                </button>
              </div>
              <div className="p-1 border-t border-gray-100 dark:border-gray-700">
                <button onClick={() => { setProfileDropdownOpen(false); handleLogout(); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="h-4 w-4" /> Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}