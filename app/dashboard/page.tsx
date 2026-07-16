// app/dashboard/page.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Church, Globe, Users, ShieldAlert } from "lucide-react"

export default function MasterDashboardPage() {
  // Data dummy tiruan untuk daftar gereja (Nanti bisa kamu tembak pakai api.get ke backend NestJS)
  const daftarGereja = [
    { id: 1, nama: "Goreja HKBP Kota", admin: "Peter Parker", email: "peter@hkbp.org", domain: "hkbpkota.gerejapintar.id", status: "Aktif" },
    { id: 2, nama: "GBI Rayon Sukses", admin: "John Doe", email: "john@gbi.id", domain: "gbisukses.com", status: "Aktif" },
    { id: 3, nama: "GKI Pondok Indah", admin: "Jane Smith", email: "jane@gki.or.id", domain: "gki-pi.org", status: "Pending Verifikasi" },
  ]

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Master Pusat Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Panel kendali global platform SaaS GerejaPintar.</p>
      </div>

      {/* Ringkasan Makro Global */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Mitra Gereja</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">24 Gereja</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Church className="h-6 w-6" /></div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Domain Terhubung</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">18 Domain</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Globe className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Akun Admin</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">42 Pengguna</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Menunggu Review</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">3 Request</p>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><ShieldAlert className="h-6 w-6" /></div>
        </div>
      </div>

      {/* ── TABEL DAFTAR GEREJA & DOMAIN GLOBAL ── */}
      <Card className="shadow-sm border border-gray-200 dark:border-gray-700 w-full">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Manajemen Klien & Langganan Domain</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 font-medium">
                <th className="py-3 px-2">Nama Gereja</th>
                <th className="py-3 px-2">Administrator</th>
                <th className="py-3 px-2">Domain Pemetaan</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {daftarGereja.map((gereja) => (
                <tr key={gereja.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-2 font-medium text-gray-900">{gereja.nama}</td>
                  <td className="py-3.5 px-2 text-gray-500">
                    <div>{gereja.admin}</div>
                    <div className="text-xs text-gray-400">{gereja.email}</div>
                  </td>
                  <td className="py-3.5 px-2 text-blue-600 font-mono text-xs">{gereja.domain}</td>
                  <td className="py-3.5 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${gereja.status === "Aktif" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                      {gereja.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}