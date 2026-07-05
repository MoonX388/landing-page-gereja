"use client"

import { Church, LogOut, Settings, Bell, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      window.location.href = "/"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary border-r border-border transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <a href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Church className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                GerejaPintar
              </span>
            </a>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-6 space-y-2">
            <SidebarLink href="#" label="Dashboard" active />
            <SidebarLink href="#" label="Data Jemaat" />
            <SidebarLink href="#" label="Keuangan" />
            <SidebarLink href="#" label="Penjadwalan" />
            <SidebarLink href="#" label="Inventaris" />
            <SidebarLink href="#" label="Laporan" />
          </nav>

          {/* Settings & Logout */}
          <div className="p-6 border-t border-border space-y-2">
            <SidebarLink href="#" label="Pengaturan" icon={Settings} />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-background/50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background">
          <div className="flex items-center justify-between p-4 md:p-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-foreground hover:text-muted-foreground"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <button className="relative p-2 text-muted-foreground hover:text-foreground">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">Admin Gereja</p>
                  <p className="text-xs text-muted-foreground">admin@gereja.id</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">Selamat Datang kembali</h1>
              <p className="text-muted-foreground">Kelola gereja Anda dengan mudah dan efisien</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Jemaat" value="247" change="+12 bulan ini" />
              <StatCard label="Persembahan" value="Rp 15.2jt" change="+8% dari bulan lalu" />
              <StatCard label="Acara Aktif" value="8" change="3 minggu depan" />
              <StatCard label="Kehadiran" value="94%" change="Rata-rata bulan ini" />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Aktivitas Terbaru</h3>
                <div className="space-y-4">
                  <ActivityItem title="Jemaat Baru Terdaftar" description="Rinto Pambudi - 2 jam yang lalu" />
                  <ActivityItem title="Persembahan Tercatat" description="Rp 1.500.000 - 4 jam yang lalu" />
                  <ActivityItem title="Ibadah Minggu Selesai" description="Kehadiran 156 orang - kemarin" />
                </div>
              </div>

              <div className="p-6 border border-border rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Ringkasan Bulan Ini</h3>
                <div className="space-y-4">
                  <RingSummaryItem label="Total Persembahan" value="Rp 45.8jt" percentage="102%" />
                  <RingSummaryItem label="Kehadiran Rata-rata" value="91%" percentage="↑ 5%" />
                  <RingSummaryItem label="Anggaran Terpakai" value="78%" percentage="Rp 39.1jt" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Akses Cepat</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickLink href="#" label="Tambah Jemaat" />
                <QuickLink href="#" label="Catat Persembahan" />
                <QuickLink href="#" label="Buat Acara" />
                <QuickLink href="#" label="Lihat Laporan" />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

function SidebarLink({
  href,
  label,
  active = false,
  icon: Icon,
}: {
  href: string
  label: string
  active?: boolean
  icon?: React.ComponentType<{ className: string }>
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-background/50"
      }`}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{label}</span>
    </a>
  )
}

function StatCard({
  label,
  value,
  change,
}: {
  label: string
  value: string
  change: string
}) {
  return (
    <div className="p-4 border border-border rounded-lg">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="text-2xl font-semibold text-foreground mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{change}</p>
    </div>
  )
}

function ActivityItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3">
      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function RingSummaryItem({
  label,
  value,
  percentage,
}: {
  label: string
  value: string
  percentage: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value}</p>
      </div>
      <p className="text-sm font-medium text-accent">{percentage}</p>
    </div>
  )
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="p-4 border border-border rounded-lg hover:border-primary hover:bg-background/50 transition-colors text-center"
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
    </a>
  )
}
