"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HandshakeIcon, Globe, Users, TrendingUp, ArrowRight } from "lucide-react"

export default function MitraPage() {
  const partnerPrograms = [
    {
      title: "Integration Partner",
      description: "Integrasikan sistem Anda dengan GerejaPintar untuk memberikan nilai tambah kepada customer",
      benefits: [
        "API documentation lengkap",
        "Technical support dedicated",
        "Co-marketing opportunities",
        "Revenue sharing program",
      ],
    },
    {
      title: "Reseller Partner",
      description: "Jual dan implementasi GerejaPintar di area Anda sendiri",
      benefits: [
        "Harga reseller kompetitif",
        "Training dan certification",
        "Sales & marketing materials",
        "Commission structure yang menguntungkan",
      ],
    },
    {
      title: "Technology Partner",
      description: "Bekerja sama dalam innovation dan product development",
      benefits: [
        "Early access ke fitur baru",
        "Joint development opportunities",
        "Co-branding potential",
        "Strategic partnership benefits",
      ],
    },
  ]

  const partnerBenefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Tingkatkan revenue dan expand market reach Anda dengan GerejaPintar",
    },
    {
      icon: Users,
      title: "Access to Network",
      description: "Akses ke 500+ gereja dan growing community",
    },
    {
      icon: Globe,
      title: "Global Platform",
      description: "Bagian dari ekosistem yang berkembang pesat di Asia Tenggara",
    },
    {
      icon: HandshakeIcon,
      title: "Dedicated Support",
      description: "Tim dedicated untuk mendukung kesuksesan partnership Anda",
    },
  ]

  const currentPartners = [
    { name: "Bank Indonesia", category: "Payment Provider" },
    { name: "WhatsApp Business", category: "Communication" },
    { name: "Google Cloud", category: "Infrastructure" },
    { name: "Vercel", category: "Technology" },
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
                Bergabung Sebagai Mitra
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Kembangkan bisnis Anda dengan menjadi partner GerejaPintar. Akses ke network luas gereja di Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Partner Programs */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Program Kemitraan Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnerPrograms.map((program, index) => (
                <div
                  key={index}
                  className="p-8 border border-border rounded-lg hover:border-primary/30 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {program.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {program.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm text-muted-foreground">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a href="/kontak">
                    <button className="w-full px-4 py-2 border border-primary text-primary hover:bg-primary/5 font-medium rounded-lg transition-colors">
                      Pelajari Lebih Lanjut
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Keuntungan Menjadi Mitra
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerBenefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="p-6 bg-background border border-border rounded-lg text-center">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
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

        {/* Current Partners */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Mitra Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentPartners.map((partner, index) => (
                <div
                  key={index}
                  className="p-6 border border-border rounded-lg text-center hover:border-primary/30 transition-colors"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">{partner.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Persyaratan Mitra
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Professional Expertise",
                  description: "Memiliki track record dan expertise di bidangnya masing-masing",
                },
                {
                  title: "Customer Focus",
                  description: "Berkomitmen untuk memberikan value terbaik kepada customer",
                },
                {
                  title: "Alignment dengan Misi",
                  description: "Setuju dengan misi GerejaPintar untuk transformasi digital gereja",
                },
                {
                  title: "Support Commitment",
                  description: "Siap untuk memberikan support quality kepada customers",
                },
              ].map((req, index) => (
                <div key={index} className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {req.title}
                    </h3>
                    <p className="text-muted-foreground">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Siap Bergabung Sebagai Mitra?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hubungi tim partnership kami untuk membahas opportunity dan bagaimana kami bisa grow bersama.
            </p>
            <a href="/kontak">
              <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                Hubungi Tim Kami
                <ArrowRight className="h-4 w-4" />
              </button>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
