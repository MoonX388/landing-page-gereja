"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowUpRight, Church, Globe, Search } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import api from "@/lib/api"

type ChurchRecord = { id: number; namaGereja: string; subdomain: string }

export default function JemaatDirectoryPage() {
  const [churches, setChurches] = useState<ChurchRecord[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    api.get("/auth/public-churches")
      .then((response) => {
        const records = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
            ? response.data.data
            : []
        setChurches(records)
        if (!records.length) setError("Belum ada gereja aktif yang terdaftar.")
      })
      .catch((requestError: any) => {
        const message = requestError.response?.data?.message
        setError(Array.isArray(message) ? message.join(", ") : message || "Direktori gereja sedang tidak tersedia. Silakan coba lagi.")
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredChurches = useMemo(
    () => churches.filter((church) => church.namaGereja.toLowerCase().includes(searchQuery.toLowerCase())),
    [churches, searchQuery],
  )

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary/30 px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Portal Jemaat</p>
              <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground md:text-6xl">Temukan Gereja Anda.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Akses layanan gereja dan informasi komunitas lokal Anda dalam satu tempat.</p>
            </div>
            <div className="relative mt-10 max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cari nama gereja atau komunitas..." className="h-14 rounded-xl border-border bg-background pl-12 text-base shadow-sm" disabled={loading} />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">Direktori</p><h2 className="mt-2 text-3xl font-serif font-bold text-foreground">Layanan gereja yang tersedia</h2></div>
              <p className="text-sm text-muted-foreground">{loading ? "Memuat..." : `${filteredChurches.length} gereja ditemukan`}</p>
            </div>
            {error && <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
            {loading ? <p className="text-sm text-muted-foreground">Menghubungkan ke database...</p> : filteredChurches.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredChurches.map((church) => (
                  <Card key={church.id} className="group flex flex-col justify-between rounded-xl border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                    <CardHeader className="p-6 pb-4"><div className="flex items-start justify-between gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Church className="h-6 w-6" /></span><span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground"><Globe className="h-3 w-3" />{church.subdomain}.gerejapintar.id</span></div><CardTitle className="mt-5 text-lg text-foreground">{church.namaGereja}</CardTitle></CardHeader>
                    <CardContent className="p-6 pt-0"><a href={`/layanan/${encodeURIComponent(church.subdomain)}`} className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80">Buka Layanan <ArrowUpRight className="h-4 w-4" /></a></CardContent>
                  </Card>
                ))}
              </div>
            ) : <p className="text-sm text-muted-foreground">Gereja tidak ditemukan.</p>}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
