// app/dashboard/[id]/_views/OverviewView.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, HardDrive, ShieldCheck, CalendarRange } from "lucide-react"

export default function OverviewView({ user, dashboardId }: { user: any; dashboardId: any }) {
  // 🚀 1. DEKLARASI STATE DYNAMIC DATA
  const [stats, setStats] = useState({
    totalJemaat: 0,
    totalStaffAdmin: 0,
    agendaBulanIni: 0,
  })
  const [loading, setLoading] = useState(true)

  // 🚀 2. FETCH DATA KETIKA DASHBOARD DIKUNJUNGI
  useEffect(() => {
    if (!dashboardId || dashboardId === "default") return

    setLoading(true)
    fetch(`https://api.gerejapintar.id/auth/dashboard-stats/${dashboardId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat statistik")
        return res.json()
      })
      .then((data) => {
        setStats({
          totalJemaat: data.totalJemaat,
          totalStaffAdmin: data.totalStaffAdmin,
          agendaBulanIni: data.agendaBulanIni,
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error("CORS / API Error:", err)
        setLoading(false)
      })
  }, [dashboardId])

  // 🚀 3. HITUNG PERSENTASE ALOKASI KUOTA SECARA OTOMATIS
  const jemaatPercentage = Math.min(Math.round((stats.totalJemaat / 5000) * 100), 100)
  const staffPercentage = Math.min(Math.round((stats.totalStaffAdmin / 10) * 100), 100)

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gereja Subdomain: <span className="text-blue-600">{dashboardId}.gerejapintar.id</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Selamat datang kembali di panel kendali operasional digital pusat manajemen jemaat.
        </p>
      </div>

      {/* ── METRIK RINGKASAN REAL-TIME DARI DATABASE ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Jemaat Terdaftar" 
          value={loading ? "..." : `${stats.totalJemaat} Jiwa`} 
          icon={Users} 
        />
        <StatCard 
          title="Staf & Admin Aktif" 
          value={loading ? "..." : `${stats.totalStaffAdmin} Akun`} 
          icon={ShieldCheck} 
        />
        <StatCard 
          title="Agenda Bulan Ini" 
          value={loading ? "..." : `${stats.agendaBulanIni} Kegiatan`} 
          icon={CalendarRange} 
        />
        <StatCard 
          title="Penyimpanan Media" 
          value="4.2 GB / 10 GB" 
          icon={HardDrive} 
        />
      </div>

      {/* Analytics Graph & Data Quota Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Statistik Kehadiran Jemaat (7 Minggu Terakhir)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {[45, 60, 75, 70, 85, 95, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-blue-500 rounded-md transition-all" style={{ height: `${height}%` }} />
                  <span className="text-xs text-gray-400">M-{i+1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── KONTEN DYNAMIC ALOKASI KUOTA SAAS ── */}
        <Card className="shadow-sm border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Alokasi & Kuota Aplikasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <UsageItem 
              label="Kuota Jemaat (Maks. 5000)" 
              value={`${jemaatPercentage}%`} 
              color="bg-blue-500" 
              percentValue={`${jemaatPercentage}%`} 
            />
            <UsageItem 
              label="Kuota Staf Admin (Maks. 10)" 
              value={`${staffPercentage}%`} 
              color="bg-green-500" 
              percentValue={`${staffPercentage}%`} 
            />
            <UsageItem 
              label="Penyimpanan Berkas Khotbah" 
              value="42%" 
              color="bg-yellow-500" 
              percentValue="42%" 
            />
            <UsageItem 
              label="Batas Kirim Email Warta/Bulan" 
              value="78%" 
              color="bg-purple-500" 
              percentValue="78%" 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon }: { title: string; value: string; icon: React.ComponentType<{ className: string }> }) {
  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700 w-full">
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

function UsageItem({ label, value, color, percentValue }: { label: string; value: string; color: string; percentValue: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-300 text-xs font-medium truncate max-w-[180px]">{label}</span>
        <span className="font-semibold text-gray-900 dark:text-white">{percentValue}</span>
      </div>
      <div className="mt-1 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: value }} />
      </div>
    </div>
  )
}