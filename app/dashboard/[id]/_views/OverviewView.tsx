"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, HardDrive, Database, Globe } from "lucide-react"

export default function OverviewView({ user, dashboardId }: { user: any; dashboardId: any }) {
  return (
    <div className="w-full space-y-6">
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
        <StatCard title="Total Pengunjung" value="12.847" icon={Users} />
        <StatCard title="Storage Terpakai" value="4.2 GB" icon={HardDrive} />
        <StatCard title="Database" value="3.8 GB" icon={Database} />
        <StatCard title="Domain Aktif" value="7" icon={Globe} />
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