"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { ArrowLeft, CalendarDays, Church, Clock3, FileText, Globe2, MapPin, Users, Utensils, UserRound, Loader2, Menu, X, Share2, Copy, Check, Phone, Award, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import api from "@/lib/api"

type Preview = {
  profile: { namaGereja: string; namaAdmin: string; subdomain: string; alamat?: string | null; kota?: string | null; provinsi?: string | null; deskripsi?: string | null; latitude?: number | null; longitude?: number | null; noHpAdmin?: string | null; email?: string | null }
  articles: Array<{ id: number; title: string; excerpt: string; category: string; authorName: string; publishedAt: string; image?: string | null }>
  schedules: Array<Record<string, any>>
  ministry: Array<Record<string, any>>
  statistics: { jemaatAktif: number; pelayanAktif: number }
  warta?: { past: Array<{ id: string; period: string; url: string }>; current: { id: string; period: string; url: string } | null; upcoming: Array<{ id: string; period: string }> }
  viewCount?: number
}

const navSections = [
  { id: "jadwal", label: "Jadwal Ibadah" },
  { id: "artikel", label: "Artikel Jemaat" },
  { id: "warta", label: "Warta Jemaat Digital" },
  { id: "lokasi", label: "Lokasi Gereja" },
  { id: "tentang", label: "Tentang Gereja" },
  { id: "kontak", label: "Kontak" },
  { id: "profil", label: "Profil Gereja" },
] as const

export default function ChurchServicePreviewPage() {
  const params = useParams<{ subdomain: string }>()
  const subdomain = params?.subdomain || ""
  const [preview, setPreview] = useState<Preview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [copiedLink, setCopiedLink] = useState(false)
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0)
  const scheduleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!subdomain) return
    api.get(`/auth/public-churches/${encodeURIComponent(subdomain)}/preview`)
      .then((response) => setPreview(response.data))
      .catch((requestError) => setError(requestError.response?.data?.message || "Layanan gereja tidak dapat dimuat."))
      .finally(() => setLoading(false))
  }, [subdomain])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navSections.map(s => s.id)
      for (const id of sections) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(id)
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!scheduleRef.current || !preview?.schedules.length) return
    const interval = setInterval(() => {
      setCurrentScheduleIndex(prev => (prev + 1) % preview.schedules.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [preview?.schedules.length])

  const handleCopyLink = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`${preview?.profile.namaGereja} - ${window.location.href}`)
    let shareUrl = ""
    if (platform === "whatsapp") shareUrl = `https://wa.me/?text=${text}`
    else if (platform === "facebook") shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  const locationText = useMemo(() => {
    if (!preview) return ""
    return [preview.profile.alamat, preview.profile.kota, preview.profile.provinsi].filter(Boolean).join(", ") || "Lokasi gereja belum ditambahkan"
  }, [preview])

  const whatsappNumber = preview?.profile.noHpAdmin || ""
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}` : ""
  const mapsQuery = encodeURIComponent(`${preview?.profile.namaGereja}, ${locationText}`)
  const mapsUrl = `https://maps.google.com/?q=${mapsQuery}`

  if (loading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Memuat layanan gereja...</div>
  if (error || !preview) return <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center"><Church className="h-12 w-12 text-primary" /><h1 className="mt-5 text-2xl font-serif font-bold">Layanan tidak ditemukan</h1><p className="mt-2 text-muted-foreground">{error || "Gereja ini belum memiliki layanan publik."}</p><Link href="/daftar-gereja" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><ArrowLeft className="h-4 w-4" />Kembali ke daftar gereja</Link></div>

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/daftar-gereja" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Church className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {preview.profile.namaGereja}
            </span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-muted">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <ul className="hidden md:flex items-center gap-1">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === section.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
              {whatsappUrl && (
                <li className="ml-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener" className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted">
                    Hubungi Gereja
                  </a>
                </li>
              )}
            </ul>
          </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background">
            <ul className="mx-auto max-w-6xl flex flex-col gap-1 px-4 py-4">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === section.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section id="beranda" className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-24">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground">
                Majelis Jemaat {preview.profile.namaGereja}
              </span>
            </div>

            <h1 className="mx-auto max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              {preview.profile.namaGereja}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              {preview.profile.deskripsi || `Selamat datang di portal layanan ${preview.profile.namaGereja}. Temukan warta, jadwal ibadah, dan informasi pelayanan gereja.`}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#warta">
                <button className="h-12 rounded-full px-7 text-base bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition-colors">
                  Lihat Warta Jemaat
                </button>
              </a>
              <a href={`https://${preview.profile.subdomain}.gerejapintar.id`} target="_blank" rel="noopener">
                <button className="h-12 rounded-full px-7 text-base border border-border bg-background font-medium hover:bg-muted transition-colors">
                  Buka Domain Cabang
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="jadwal" className="px-4 py-16 sm:px-6 bg-secondary/30">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Waktu Ibadah</p>
              <h2 className="text-3xl font-bold">Mari Beribadah Bersama Kami</h2>
            </div>
            {preview.schedules.length > 0 ? (
              <div className="relative overflow-hidden" ref={scheduleRef}>
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentScheduleIndex * 100}%)` }}>
                  {preview.schedules.map((schedule, index) => (
                    <div key={schedule.id || index} className="w-full flex-shrink-0 px-2">
                      <div className="bg-white rounded-2xl border border-border p-6 text-center shadow-lg">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                          <CalendarDays className="h-7 w-7 text-purple-600" />
                        </div>
                        {index === 0 && (
                          <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold mb-3">Hari Ini</span>
                        )}
                        {index === 1 && (
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">Besok</span>
                        )}
                        <h3 className="text-xl font-bold mb-2">{schedule.nama || schedule.judul || schedule.kegiatan || "Jadwal Ibadah"}</h3>
                        <p className="text-muted-foreground font-semibold mb-1">
                          {schedule.tanggal || schedule.hari || "Tanggal belum ditentukan"}
                        </p>
                        <p className="text-muted-foreground flex items-center justify-center gap-1">
                          <Clock3 className="h-4 w-4" />
                          {schedule.jam || schedule.waktu || "Waktu belum ditentukan"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">{schedule.lokasi || locationText}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {preview.schedules.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScheduleIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentScheduleIndex === index ? "bg-primary" : "bg-primary/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState icon={<CalendarDays />} title="Belum ada jadwal" text="Jadwal ibadah belum dipublikasikan oleh gereja." />
            )}
          </div>
        </section>

        {/* Articles Section */}
        <section id="artikel" className="px-4 py-16 sm:px-6 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Artikel Jemaat</p>
                <h2 className="text-3xl font-bold mb-2">Artikel Terbaru</h2>
                <p className="text-muted-foreground">Pilihan artikel terbaru dari seluruh ekosistem gereja.</p>
              </div>
              <Link href="/daftar-gereja" className="px-4 py-2 rounded-full border border-border font-medium hover:bg-muted transition-colors">
                Lihat Semua Artikel
              </Link>
            </div>
            {preview.articles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {preview.articles.map((article) => (
                  <article key={article.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {article.image && (
                      <div className="aspect-video bg-secondary/30">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(article.publishedAt).toLocaleDateString("id-ID")} • {article.authorName}
                      </p>
                      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState icon={<FileText />} title="Belum ada artikel" text="Warta dan pengumuman gereja akan tampil di sini." />
            )}
          </div>
        </section>

        {/* Warta Section */}
        <section id="warta" className="px-4 py-16 sm:px-6 bg-secondary/30">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Digital Bulletin</p>
              <h2 className="text-3xl font-bold mb-3">Warta Jemaat Digital</h2>
              <p className="text-muted-foreground">Akses informasi warta terbaru, arsip, dan periode penerbitan berikutnya.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Past Warta */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Clock3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Warta Jemaat Lalu</h3>
                    <p className="text-sm text-muted-foreground">Arsip warta yang sudah terbit.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {preview.warta?.past?.length ? (
                    preview.warta.past.map((warta) => (
                      <a key={warta.id} href={warta.url} target="_blank" className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                        <FileText className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">{warta.period}</span>
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Belum ada warta lalu.</p>
                  )}
                </div>
              </div>

              {/* Current Warta */}
              <div className="bg-white rounded-2xl border-2 border-primary p-6 text-center relative overflow-hidden">
                <div className="absolute top-4 right-[-2.4rem] bg-primary text-white px-8 py-1 text-xs font-bold uppercase tracking-wider rotate-38">
                  Terbaru
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Warta Sekarang</h3>
                {preview.warta?.current ? (
                  <>
                    <p className="text-muted-foreground font-semibold mb-4">{preview.warta.current.period}</p>
                    <a href={preview.warta.current.url} target="_blank" className="inline-block px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                      Lihat Warta Digital
                    </a>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Belum ada warta aktif.</p>
                )}
              </div>

              {/* Upcoming Warta */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <CalendarDays className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Warta Mendatang</h3>
                    <p className="text-sm text-muted-foreground">Periode publikasi berikutnya.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {preview.warta?.upcoming?.length ? (
                    preview.warta.upcoming.map((warta) => (
                      <div key={warta.id} className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                        <span className="text-sm font-medium text-yellow-800">{warta.period}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Belum ada warta mendatang.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="lokasi" className="px-4 py-16 sm:px-6 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 items-start mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Kunjungi Kami</p>
                <h2 className="text-3xl font-bold mb-3">Lokasi Gereja</h2>
                <p className="text-muted-foreground">Temukan lokasi gereja melalui peta digital dan gunakan petunjuk arah untuk berkunjung.</p>
              </div>
              <div className="text-right">
                <a href={mapsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border font-medium hover:bg-muted transition-colors">
                  <MapPin className="h-4 w-4" />
                  Petunjuk Arah
                </a>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                {preview.profile.latitude && preview.profile.longitude ? (
                  <iframe
                    className="w-full h-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${preview.profile.latitude},${preview.profile.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                ) : (
                  <div className="w-full h-80 flex items-center justify-center bg-secondary/30 text-muted-foreground">
                    Peta akan tersedia setelah koordinat lokasi ditambahkan
                  </div>
                )}
              </div>
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{preview.profile.namaGereja}</h3>
                <p className="text-muted-foreground mb-4">{locationText}</p>
                <a href={mapsUrl} target="_blank" rel="noopener" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-border font-medium hover:bg-muted transition-colors">
                  <Globe2 className="h-4 w-4" />
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="tentang" className="px-4 py-16 sm:px-6 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                <Church className="h-32 w-32 text-purple-300" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Majelis Jemaat {preview.profile.namaGereja}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                  {preview.profile.deskripsi || `Mengucapkan "Selamat datang dan beribadah bagi semua Warga Jemaat ${preview.profile.namaGereja} dan Warga Jemaat yang baru beribadah di gereja ini". Bagi Saudara (i) yang berdomisili di Wilayah Jemaat dan mempunyai kerinduan untuk menjadi Anggota Jemaat supaya dapat dilayani seterusnya, dimohon kesediaannya untuk mendaftarkan diri.`}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-2 rounded-full border border-border text-sm font-medium">Pelayanan</span>
                  <span className="px-3 py-2 rounded-full border border-border text-sm font-medium">Persekutuan</span>
                  <span className="px-3 py-2 rounded-full border border-border text-sm font-medium">Ibadah</span>
                  <span className="px-3 py-2 rounded-full border border-border text-sm font-medium">Komunitas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontak" className="px-4 py-16 sm:px-6 bg-secondary/30">
          <div className="mx-auto max-w-6xl">
            <div className="bg-white rounded-2xl border border-border p-8 text-center">
              <h2 className="text-3xl font-bold mb-3">Ingin Berkunjung atau Butuh Informasi?</h2>
              <p className="text-muted-foreground mb-6">Silakan hubungi gereja melalui WhatsApp atau kunjungi lokasi gereja menggunakan peta digital.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {whatsappUrl && (
                  <a href={whatsappUrl} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                    <Phone className="h-4 w-4" />
                    Kirim Pesan WhatsApp
                  </a>
                )}
                <a href={mapsUrl} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border font-medium hover:bg-muted transition-colors">
                  <MapPin className="h-4 w-4" />
                  Buka Lokasi Gereja
                </a>
              </div>
              <div className="mt-4">
                <Link href="/daftar-gereja" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Daftar Gereja
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profil" className="px-4 py-16 sm:px-6 bg-background">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Informasi Dasar</p>
              <h2 className="text-3xl font-bold">Detail Pelayanan Kami</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Alamat Gereja</h3>
                <p className="text-muted-foreground text-sm">{locationText}</p>
              </div>
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Kontak & WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-1">{whatsappNumber || "Belum tersedia"}</p>
                <p className="text-muted-foreground text-sm">{preview.profile.email || "Belum tersedia"}</p>
              </div>
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Penanggung Jawab</h3>
                <p className="text-muted-foreground text-sm mb-1">{preview.profile.namaAdmin}</p>
                <p className="text-muted-foreground text-sm">Majelis Jemaat {preview.profile.namaGereja}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Share Section */}
        <section className="px-4 py-16 sm:px-6 bg-secondary/30">
          <div className="mx-auto max-w-6xl">
            <div className="bg-white rounded-2xl border border-border p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Bagikan</p>
              <h2 className="text-3xl font-bold mb-3">Bagikan Halaman Gereja Ini</h2>
              <p className="text-muted-foreground mb-6">Salin tautan atau bagikan ke media sosial untuk memudahkan jemaat menemukan halaman ini.</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={() => handleShare("whatsapp")} className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:border-primary/50 hover:shadow-md transition-all">
                  <Phone className="h-5 w-5" />
                </button>
                <button onClick={() => handleShare("facebook")} className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:border-primary/50 hover:shadow-md transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
                <button onClick={handleCopyLink} className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:border-primary/50 hover:shadow-md transition-all">
                  {copiedLink ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              {copiedLink && (
                <p className="mt-4 text-sm text-green-600 font-medium">Tautan berhasil disalin!</p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          {preview.viewCount && (
            <p className="text-sm opacity-75 mb-4">Dilihat {preview.viewCount} kali</p>
          )}
          <Church className="h-12 w-12 mx-auto mb-4 opacity-75" />
          <p className="text-sm opacity-75">Halaman publik ini disediakan oleh GerejaPintar.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition-colors"
        >
          <Phone className="h-5 w-5" />
          <span className="hidden sm:inline">Hubungi</span>
        </a>
      )}
    </div>
  )
}

function EmptyState({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground"><div className="mx-auto w-fit text-primary">{icon}</div><h2 className="mt-4 font-semibold text-foreground">{title}</h2><p className="mt-2 text-sm">{text}</p></div> }
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) { return <div className="rounded-xl border border-border bg-card p-6"><div className="flex items-center justify-between"><span className="text-primary">{icon}</span><span className="text-3xl font-bold text-foreground">{value}</span></div><p className="mt-5 text-sm text-muted-foreground">{label}</p></div> }
