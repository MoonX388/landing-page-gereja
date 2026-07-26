"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function DashboardNotFound() {
  const router = useRouter()
  const { user } = useAuth() as any

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 text-center font-sans">
      <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-full mb-4 animate-bounce">
        <ShieldAlert className="h-12 w-12" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        404 - Hub Tidak Ditemukan
      </h1>
      
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
        Maaf, alamat hub instansi yang Anda tuju tidak terdaftar, telah dinonaktifkan, atau salah ketik di dalam sistem platform pusat.
      </p>
      
      <div className="mt-6">
        <Button 
          onClick={() => {
            if (user?.role === 'super_admin') {
              router.push('/dashboard')
            } else {
              window.location.href = "https://gerejapintar.id"
            }
          }} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl px-6 py-2.5 shadow-sm transition-colors"
        >
          {user?.role === 'super_admin' ? "Kembali ke Dashboard Master" : "Kembali ke Beranda Utama"}
        </Button>
      </div>
    </div>
  )
}