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

  // Mengubah border-border menjadi border-sidebar-border agar garisnya selaras/menyatu dengan sidebar
  return (
    <header className="bg-background border-b border-sidebar-border sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        
        {/* Hover disamakan dengan sidebar-accent */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="md:hidden text-sidebar-foreground/70 p-1.5 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        <div className="flex items-center gap-3 ml-auto relative" ref={dropdownRef}>
          {/* Efek hover pada tombol profil disamakan dengan gaya sidebar */}
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} 
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-left transition-colors focus:outline-none"
          >
            <Avatar className="h-8 w-8 border border-sidebar-border">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {user?.namaAdmin?.charAt(0).toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-foreground">{user?.namaAdmin || "Admin"}</p>
              <p className="text-[10px] text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-popover text-popover-foreground border border-sidebar-border shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-sidebar-border">
                <p className="text-sm font-semibold truncate">{user?.namaAdmin}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <div className="p-1 space-y-0.5">
                {/* Menyamakan padding, radius, font-weight, dan hover color seperti SidebarLink */}
                <button 
                  onClick={() => { setProfileDropdownOpen(false); router.push(`/dashboard/profile/${user?.id || 'me'}`); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <User className="h-4 w-4" /> Profil Saya
                </button>
                <button 
                  onClick={() => { 
                    setProfileDropdownOpen(false); 
                    const targetSubdomain = dashboardId || user?.subdomain;
                    if (targetSubdomain && targetSubdomain !== "undefined") {
                      router.push(`/dashboard/${targetSubdomain}/settings`);
                    } else {
                      router.push("/dashboard");
                    }
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <Settings className="h-4 w-4" /> Pengaturan Hub
                </button>
              </div>
              <div className="p-1 border-t border-sidebar-border">
                <button 
                  onClick={() => { setProfileDropdownOpen(false); handleLogout(); }} 
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
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
