"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Church, Zap, BarChart3, Users } from "lucide-react"

export default function SolutiPage() {
  const solutions = [
    {
      title: "Gereja Kecil & Jemaat Baru",
      icon: Church,
      description: "Solusi terjangkau untuk gereja yang baru dimulai atau memiliki jemaat kecil",
      features: [
        "Database jemaat hingga 500 orang",
        "Pencatatan persembahan dasar",
        "Penjadwalan ibadah",
        "Email support",
        "Mulai dari Rp 99rb/bulan",
      ],
      color: "text-blue-600",
    },
    {
      title: "Gereja Menengah",
      icon: Users,
      description: "Fitur lengkap untuk gereja dengan jemaat aktif dan kebutuhan manajemen kompleks",
      features: [
        "Database jemaat tak terbatas",
        "Manajemen keuangan & laporan",
        "Inventaris & aset",
        "WhatsApp integration",
        "Priority support",
        "Mulai dari Rp 299rb/bulan",
      ],
      color: "text-green-600",
      highlighted: true,
    },
    {
      title: "Gereja Besar & Sinode",
      icon: BarChart3,
      description: "Solusi enterprise untuk gereja besar dengan cabang dan struktur kompleks",
      features: [
        "Manajemen multi-cabang",
        "Custom dashboard & laporan",
        "API integration",
        "Video streaming",
        "Dedicated account manager",
        "Custom pricing",
      ],
      color: "text-purple-600",
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Hemat Waktu",
      description: "Otomasi proses administratif dan fokus pada pelayanan spiritual",
    },
    {
      icon: BarChart3,
      title: "Data Akurat",
      description: "Laporan real-time dan transparansi keuangan gereja yang jelas",
    },
    {
      icon: Users,
      title: "Engagement Lebih",
      description: "Tingkatkan keterlibatan jemaat dengan komunikasi yang lebih baik",
    },
    {
      icon: Church,
      title: "Pertumbuhan Gereja",
      description: "Dukung pertumbuhan gereja dengan data dan insight yang mendalam",
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
                Solusi untuk Gereja Anda
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Pilih paket solusi yang sesuai dengan ukuran dan kebutuhan gereja Anda. Kami punya solusi untuk semua.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutions.map((solution, index) => {
                const Icon = solution.icon
                return (
                  <div
                    key={index}
                    className={`p-8 rounded-lg border transition-all ${
                      solution.highlighted
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    {solution.highlighted && (
                      <div className="mb-4">
                        <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                          Paling Populer
                        </span>
                      </div>
                    )}
                    <Icon className={`h-12 w-12 ${solution.color} mb-4`} />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      {solution.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="/register">
                      <button
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          solution.highlighted
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border border-primary text-primary hover:bg-primary/5"
                        }`}
                      >
                        Coba Sekarang
                      </button>
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Mengapa Memilih GerejaPintar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="p-6 rounded-lg bg-background border border-border">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Transformasi Manajemen Gereja Anda Sekarang
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ratusan gereja sudah mempercayai GerejaPintar. Bergabunglah dan rasakan perbedaannya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register">
                <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                  Mulai Gratis 14 Hari
                  <ArrowRight className="h-4 w-4" />
                </button>
              </a>
              <a href="/kontak">
                <button className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary/5 font-medium transition-colors w-full sm:w-auto">
                  Hubungi Kami
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
