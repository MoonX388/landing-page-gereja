"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, FileText, Video, MessageCircle, Mail } from "lucide-react"

export default function PusatBantuanPage() {
  const categories = [
    {
      title: "Memulai Dengan GerejaPintar",
      icon: FileText,
      articles: [
        "Cara mendaftar akun",
        "Setup profil gereja",
        "Mengundang team members",
        "Navigasi dashboard",
      ],
    },
    {
      title: "Manajemen Data Jemaat",
      icon: FileText,
      articles: [
        "Menambah jemaat baru",
        "Update profil jemaat",
        "Tracking kehadiran",
        "Kategorisasi jemaat",
      ],
    },
    {
      title: "Manajemen Keuangan",
      icon: FileText,
      articles: [
        "Mencatat persembahan",
        "Membuat laporan keuangan",
        "Analisis pengeluaran",
        "Export laporan",
      ],
    },
    {
      title: "Penjadwalan & Acara",
      icon: FileText,
      articles: [
        "Membuat jadwal ibadah",
        "Mengatur acara gereja",
        "Assign team untuk acara",
        "Notifikasi peserta",
      ],
    },
    {
      title: "Keamanan & Akun",
      icon: FileText,
      articles: [
        "Mengubah password",
        "Setup 2FA",
        "Manage user roles",
        "Data privacy",
      ],
    },
    {
      title: "Integration & API",
      icon: FileText,
      articles: [
        "WhatsApp integration",
        "API documentation",
        "Webhook setup",
        "Third-party tools",
      ],
    },
  ]

  const faqs = [
    {
      category: "Akun & Login",
      items: [
        {
          q: "Bagaimana cara reset password saya?",
          a: "Klik 'Lupa password?' di halaman login dan ikuti instruksi yang dikirimkan ke email Anda.",
        },
        {
          q: "Bisakah saya menggunakan satu akun untuk multiple gereja?",
          a: "Tidak, setiap gereja membutuhkan akun terpisah. Namun Anda bisa mengelola multiple gereja dengan one login.",
        },
      ],
    },
    {
      category: "Fitur & Penggunaan",
      items: [
        {
          q: "Berapa maksimal jemaat yang bisa saya kelola?",
          a: "Tergantung paket Anda. Paket Pelayanan mendukung jemaat unlimited.",
        },
        {
          q: "Bagaimana cara membuat backup data?",
          a: "Kami membuat backup otomatis setiap hari. Anda juga bisa manually download data Anda kapan saja.",
        },
      ],
    },
  ]

  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Hubungi kami via email",
      value: "support@gerejapintar.id",
      action: "Kirim Email",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Chat dengan support team",
      value: "+62 812-3456-7890",
      action: "Chat Sekarang",
    },
    {
      icon: Video,
      title: "Tutorial Video",
      description: "Tonton tutorial lengkap",
      value: "YouTube Channel",
      action: "Lihat Video",
    },
    {
      icon: MessageCircle,
      title: "Knowledge Base",
      description: "Akses dokumentasi lengkap",
      value: "docs.gerejapintar.id",
      action: "Baca Docs",
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
                Pusat Bantuan
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Temukan jawaban, tutorial, dan dokumentasi untuk memaksimalkan GerejaPintar
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari artikel, tutorial, atau FAQ..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Cara Menghubungi Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon
                return (
                  <div
                    key={index}
                    className="p-6 bg-background border border-border rounded-lg hover:border-primary/30 transition-colors"
                  >
                    <Icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {channel.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {channel.description}
                    </p>
                    <p className="text-sm font-medium text-primary mb-3">
                      {channel.value}
                    </p>
                    <button className="text-primary text-sm font-medium hover:text-primary/80">
                      {channel.action} →
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Dokumentasi & Artikel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <div
                    key={index}
                    className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors"
                  >
                    <Icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.articles.map((article, i) => (
                        <li key={i}>
                          <a
                            href="#"
                            className="text-sm text-primary hover:text-primary/80 flex items-center gap-2"
                          >
                            <span>→</span>
                            {article}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="space-y-6">
              {faqs.map((faqGroup, gIndex) => (
                <div key={gIndex}>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {faqGroup.category}
                  </h3>
                  <div className="space-y-4 mb-8">
                    {faqGroup.items.map((item, iIndex) => (
                      <div key={iIndex} className="p-6 bg-background border border-border rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">
                          {item.q}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
