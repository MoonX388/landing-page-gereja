import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Users, DollarSign, Calendar, Package, BarChart3, Smartphone } from "lucide-react"

export const metadata = {
  title: "Fitur GerejaPintar | Solusi Manajemen Gereja Terpadu",
  description: "Jelajahi fitur-fitur lengkap GerejaPintar untuk manajemen jemaat, keuangan, penjadwalan, dan laporan gereja modern.",
}

export default function FiturPage() {
  const features = [
    {
      icon: Users,
      title: "Manajemen Data Jemaat",
      description: "Kelola data lengkap jemaat termasuk profil, kehadiran, dan riwayat spiritual",
      points: ["Database jemaat terpusat", "Tracking kehadiran otomatis", "Profil lengkap per jemaat", "Kategori & kelompok jemaat"],
    },
    {
      icon: DollarSign,
      title: "Manajemen Keuangan",
      description: "Pencatatan persembahan dan laporan keuangan yang akurat dan transparan",
      points: ["Catat persembahan mingguan", "Laporan keuangan real-time", "Kategori pengeluaran", "Audit trail lengkap"],
    },
    {
      icon: Calendar,
      title: "Penjadwalan Acara",
      description: "Kelola jadwal ibadah, kegiatan, dan acara gereja dengan mudah",
      points: ["Kalender gereja interaktif", "Pengingat otomatis", "Manajemen speaker & team", "Publikasi ke anggota"],
    },
    {
      icon: Package,
      title: "Manajemen Inventaris",
      description: "Lacak aset dan inventaris gereja dengan sistem yang terorganisir",
      points: ["Database aset lengkap", "Tracking pemeliharaan", "Lokasi & kondisi barang", "Laporan inventaris"],
    },
    {
      icon: BarChart3,
      title: "Laporan & Analitik",
      description: "Dapatkan insights mendalam tentang pertumbuhan dan kesehatan gereja",
      points: ["Dashboard real-time", "Laporan kustomisasi", "Export ke berbagai format", "Visualisasi data interaktif"],
    },
    {
      icon: Smartphone,
      title: "Akses Mobile",
      description: "Kelola gereja dari mana saja dengan aplikasi mobile yang responsif",
      points: ["Interface mobile-friendly", "Sinkronisasi real-time", "Push notifications", "Offline access"],
    },
  ]

  const addons = [
    {
      name: "Integrasi WhatsApp",
      description: "Otomasi komunikasi dengan jemaat melalui WhatsApp",
    },
    {
      name: "Email Marketing",
      description: "Kampanye email untuk penjangkauan gereja yang lebih luas",
    },
    {
      name: "Video Streaming",
      description: "Live streaming ibadah dan acara gereja",
    },
    {
      name: "E-Learning Platform",
      description: "Platform pembelajaran online untuk kelas dan studi alkitab",
    },
    {
      name: "Donation Portal",
      description: "Portal donasi online untuk persembahan digital",
    },
    {
      name: "Member App",
      description: "Aplikasi khusus anggota untuk keterlibatan yang lebih baik",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Fitur-Fitur Lengkap
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                GerejaPintar menyediakan solusi manajemen gereja terpadu dengan fitur-fitur lengkap yang dirancang khusus untuk kebutuhan gereja modern.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Tambahan Optional
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {addons.map((addon, index) => (
                <div key={index} className="p-6 border border-border rounded-lg bg-background hover:border-primary/30 transition-colors">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{addon.name}</h3>
                  <p className="text-muted-foreground text-sm">{addon.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Siap Menggunakan GerejaPintar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Tingkatkan manajemen gereja Anda dengan fitur-fitur terlengkap di kelasnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register">
                <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                  Daftar Gratis
                  <ArrowRight className="h-4 w-4" />
                </button>
              </a>
              <a href="https://demo.gerejapintar.id">
                <button className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary/5 font-medium transition-colors w-full sm:w-auto">
                  Lihat Demo
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
