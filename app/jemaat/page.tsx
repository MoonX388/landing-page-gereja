"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Church, Search, ArrowUpRight, Globe } from "lucide-react"

export default function JemaatDirectoryPage() {
  const [daftarGereja, setDaftarGereja] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("https://api.gerejapintar.id/auth/public-churches")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data")
        return res.json()
      })
      .then((data) => {
        setDaftarGereja(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const filteredGereja = daftarGereja.filter((gereja) =>
    gereja.namaGereja.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getLogoLetter = (name: string) => (name ? name.trim().charAt(0).toUpperCase() : "G")

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-10 text-white shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Temukan Layanan Hub Gereja Anda</h1>
          <p className="text-blue-100 text-sm mt-1">Cari nama gereja lokal Anda untuk mengakses warta & jam ibadah.</p>
        </div>
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input type="text" placeholder="Cari nama gereja..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} disabled={loading || error} className="pl-9 bg-white text-slate-900 border-none rounded-xl text-sm shadow-md" />
        </div>
      </div>

      {loading && <p className="text-center text-sm text-slate-500">Menghubungkan ke database...</p>}
      {error && <p className="text-center text-sm text-red-500">Gagal memuat data dari server.</p>}

      {!loading && !error && (
        filteredGereja.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGereja.map((gereja) => (
              <Card key={gereja.id} className="bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all rounded-xl group flex flex-col justify-between">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-blue-600 font-bold">{getLogoLetter(gereja.namaGereja)}</span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-blue-500">
                      <Globe className="h-3 w-3" />
                      <span>{gereja.subdomain}.id</span>
                    </div>
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900 mt-4 line-clamp-2">{gereja.namaGereja}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <button onClick={() => window.location.href = `https://${gereja.subdomain}.gerejapintar.id`} className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors">
                    <span>Buka Layanan Jemaat</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500">Gereja tidak ditemukan.</p>
        )
      )}
    </div>
  )
}