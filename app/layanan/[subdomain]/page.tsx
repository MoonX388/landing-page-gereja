"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, CalendarDays, Church, Clock3, FileText, Globe2, MapPin, Users, Utensils, UserRound, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import api from "@/lib/api"

type Preview = {
  profile: { namaGereja: string; namaAdmin: string; subdomain: string; alamat?: string | null; kota?: string | null; provinsi?: string | null; deskripsi?: string | null; latitude?: number | null; longitude?: number | null }
  articles: Array<{ id: number; title: string; excerpt: string; category: string; authorName: string; publishedAt: string }>
  schedules: Array<Record<string, any>>
  ministry: Array<Record<string, any>>
  statistics: { jemaatAktif: number; pelayanAktif: number }
}

const tabs = ["Artikel", "Jadwal Ibadah", "Lokasi", "Pelayanan", "Statistik"] as const

type Tab = typeof tabs[number]

export default function ChurchServicePreviewPage() {
  const params = useParams<{ subdomain: string }>()
  const subdomain = params?.subdomain || ""
  const [preview, setPreview] = useState<Preview | null>(null)
  const [tab, setTab] = useState<Tab>("Artikel")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!subdomain) return
    api.get(`/auth/public-churches/${encodeURIComponent(subdomain)}/preview`)
      .then((response) => setPreview(response.data))
      .catch((requestError) => setError(requestError.response?.data?.message || "Layanan gereja tidak dapat dimuat."))
      .finally(() => setLoading(false))
  }, [subdomain])

  const locationText = useMemo(() => {
    if (!preview) return ""
    return [preview.profile.alamat, preview.profile.kota, preview.profile.provinsi].filter(Boolean).join(", ") || "Lokasi gereja belum ditambahkan"
  }, [preview])

  if (loading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Memuat layanan gereja...</div>
  if (error || !preview) return <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center"><Church className="h-12 w-12 text-primary" /><h1 className="mt-5 text-2xl font-serif font-bold">Layanan tidak ditemukan</h1><p className="mt-2 text-muted-foreground">{error || "Gereja ini belum memiliki layanan publik."}</p><Link href="/daftar-gereja" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><ArrowLeft className="h-4 w-4" />Kembali ke daftar gereja</Link></div>

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary/30 px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Link href="/daftar-gereja" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Semua gereja</Link>
            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Church className="h-7 w-7" /></div><p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Portal Layanan Gereja</p><h1 className="mt-2 text-4xl font-serif font-bold text-foreground md:text-6xl">{preview.profile.namaGereja}</h1><p className="mt-4 flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" />{locationText}</p></div>
              <a href={`https://${preview.profile.subdomain}.gerejapintar.id`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted">Buka domain cabang <Globe2 className="h-4 w-4" /></a>
            </div>
            <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">{preview.profile.deskripsi || `Selamat datang di portal layanan ${preview.profile.namaGereja}. Temukan warta, jadwal ibadah, dan informasi pelayanan gereja.`}</p>
          </div>
        </section>

        <section className="border-b border-border px-4 sm:px-6"><div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-3">{tabs.map((item) => <button key={item} type="button" onClick={() => setTab(item)} className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{item}</button>)}</div></section>

        <section className="px-4 py-14 sm:px-6 md:py-20"><div className="mx-auto max-w-6xl">
          {tab === "Artikel" && <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{preview.articles.length ? preview.articles.map((article) => <article key={article.id} className="rounded-xl border border-border bg-card p-6"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{article.category}</span><h2 className="mt-5 text-xl font-semibold text-foreground">{article.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p><p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">{article.authorName} · {new Date(article.publishedAt).toLocaleDateString("id-ID")}</p></article>) : <EmptyState icon={<FileText />} title="Belum ada artikel" text="Warta dan pengumuman gereja akan tampil di sini." />}</div>}
          {tab === "Jadwal Ibadah" && (preview.schedules.length ? <div className="grid gap-4 md:grid-cols-2">{preview.schedules.map((schedule, index) => <div key={schedule.id || index} className="rounded-xl border border-border bg-card p-5"><div className="flex items-start gap-4"><span className="rounded-lg bg-primary/10 p-3 text-primary"><CalendarDays className="h-5 w-5" /></span><div><h2 className="font-semibold text-foreground">{schedule.nama || schedule.judul || schedule.kegiatan || "Jadwal Ibadah"}</h2><p className="mt-1 text-sm text-muted-foreground">{schedule.tanggal || schedule.hari || "Tanggal belum ditentukan"}</p><p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{schedule.jam || schedule.waktu || "Waktu belum ditentukan"}</p></div></div></div>)}</div> : <EmptyState icon={<CalendarDays />} title="Belum ada jadwal" text="Jadwal ibadah belum dipublikasikan oleh gereja." />)}
          {tab === "Lokasi" && <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]"><div className="rounded-xl border border-border bg-card p-6"><MapPin className="h-7 w-7 text-primary" /><h2 className="mt-5 text-xl font-semibold">Lokasi gereja</h2><p className="mt-3 leading-relaxed text-muted-foreground">{locationText}</p>{preview.profile.latitude && preview.profile.longitude && <a className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary" href={`https://www.google.com/maps?q=${preview.profile.latitude},${preview.profile.longitude}`} target="_blank" rel="noreferrer">Buka di Google Maps <Globe2 className="h-4 w-4" /></a>}</div><div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30 text-center text-sm text-muted-foreground">Peta interaktif tersedia setelah koordinat lokasi ditambahkan.</div></div>}
          {tab === "Pelayanan" && (preview.ministry.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{preview.ministry.map((person, index) => <div key={person.id || index} className="rounded-xl border border-border bg-card p-5"><UserRound className="h-5 w-5 text-primary" /><h2 className="mt-4 font-semibold">{person.nama || person.namaLengkap || person.name || "Pelayan Gereja"}</h2><p className="mt-1 text-sm text-muted-foreground">{person.jabatan || person.role || person.bidang || "Pelayanan"}</p></div>)}</div> : <EmptyState icon={<Users />} title="Data pelayanan belum tersedia" text="Informasi pelayan Tuhan akan tampil setelah diperbarui oleh admin gereja." />)}
          {tab === "Statistik" && <div className="grid gap-5 sm:grid-cols-2"><StatCard icon={<Users />} label="Jemaat aktif" value={preview.statistics.jemaatAktif} /><StatCard icon={<UserRound />} label="Pelayan Tuhan aktif" value={preview.statistics.pelayanAktif} /><StatCard icon={<Utensils />} label="Subdomain layanan" value={preview.profile.subdomain} /></div>}
        </div></section>
      </main>
      <SiteFooter />
    </div>
  )
}

function EmptyState({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground"><div className="mx-auto w-fit text-primary">{icon}</div><h2 className="mt-4 font-semibold text-foreground">{title}</h2><p className="mt-2 text-sm">{text}</p></div> }
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) { return <div className="rounded-xl border border-border bg-card p-6"><div className="flex items-center justify-between"><span className="text-primary">{icon}</span><span className="text-3xl font-bold text-foreground">{value}</span></div><p className="mt-5 text-sm text-muted-foreground">{label}</p></div> }
