"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Church, Globe, Users, ShieldAlert } from "lucide-react"

export default function MasterDashboardPage() {
  const [churches, setChurches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token") // Menangkap token sesi login aktif
    
    fetch("https://api.gerejapintar.id/auth/master/churches", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setChurches(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Master Pusat Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Panel kendali global platform SaaS GerejaPintar.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Mitra Gereja</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{loading ? "..." : `${churches.length} Gereja`}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Church className="h-6 w-6" /></div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Domain Terhubung</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{loading ? "..." : `${churches.length} Domain`}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Globe className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Akun Admin</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{loading ? "..." : `${churches.length} Pengguna`}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Menunggu Review</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">0 Request</p>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><ShieldAlert className="h-6 w-6" /></div>
        </div>
      </div>

      <Card className="shadow-sm border border-gray-200 dark:border-gray-700 w-full">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Manajemen Klien & Langganan Domain</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-sm text-gray-500 text-center py-6">Sinkronisasi data tabel pusat...</p>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-medium">
                  <th className="py-3 px-2">Nama Gereja</th>
                  <th className="py-3 px-2">Administrator</th>
                  <th className="py-3 px-2">Domain Pemetaan</th>
                  <th className="py-3 px-2">Status Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {churches.map((gereja) => (
                  <tr key={gereja.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-2 font-medium text-gray-900">{gereja.namaGereja}</td>
                    <td className="py-3.5 px-2 text-gray-500">
                      <div>{gereja.namaAdmin}</div>
                      <div className="text-xs text-gray-400">{gereja.email}</div>
                    </td>
                    <td className="py-3.5 px-2 text-blue-600 font-mono text-xs">{gereja.subdomain}.gerejapintar.id</td>
                    <td className="py-3.5 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${gereja.isVerified ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                        {gereja.isVerified ? "Terverifikasi" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}