"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Gereja",
    price: "Gratis",
    originalPrice: "",
    trial: "3 Bulan Gratis",
    period: "",
    description: "Untuk gereja kecil yang baru memulai digitalisasi.",
    features: [
      "Hingga 100 data jemaat",
      "Manajemen kehadiran dasar",
      "Portal jemaat sederhana",
      "Manajemen keuangan & persembahan",
      "Manajemen inventaris & aset",
      "Dukungan komunitas",
    ],
    cta: "Mulai Gratis",
    // 🚀 Diarahkan langsung ke halaman pendaftaran mandiri (Self-service register)
    href: "/register",
    external: false,
    highlighted: false,
  },
  {
    name: "Resort",
    price: "Rp 310rb",
    originalPrice: "Rp 350rb",
    period: "/bulan",
    description: "Paling populer untuk gereja yang sedang bertumbuh.",
    features: [
      "Hingga 5000 data jemaat",
      "Manajemen kehadiran otomatis",
      "Portal jemaat interaktif",
      "Integrasi WhatsApp untuk otomasi",
      "Laporan & analitik lengkap",
      "Dukungan prioritas",
    ],
    cta: "Coba 14 Hari Gratis",
    // 🚀 Mengarah ke WhatsApp Anda dengan pesan otomatis khusus Paket Resort
    href: "https://wa.me/6282158024074?text=Halo%20GerejaPintar!%20Saya%20tertarik%20untuk%20mencoba%2014%20Hari%20Gratis%20dan%20berlangganan%20*Paket%20Resort*.",
    external: true,
    highlighted: true,
  },
  {
    name: "Sinode",
    price: "Custom",
    originalPrice: "",
    period: "",
    description: "Untuk gereja besar dengan banyak cabang.",
    features: [
      "Semua fitur paket Pelayanan",
      "Multi-cabang / multi-jemaat",
      "Integrasi khusus",
      "Manajer akun khusus",
      "Pelatihan tim on-site",
    ],
    cta: "Hubungi Kami",
    // 🚀 Mengarah ke WhatsApp Anda dengan pesan otomatis konsultasi Paket Sinode
    href: "https://wa.me/6282158024074?text=Halo%20GerejaPintar!%20Saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20*Paket%20Sinode*%20untuk%20multi-cabang%20gereja%20kami.",
    external: true,
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="harga" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-foreground">Harga</span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground text-balance md:text-4xl">
            Pilih paket yang sesuai dengan gereja Anda
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
            Mulai gratis, tingkatkan kapan saja. Tanpa biaya tersembunyi dan bisa dibatalkan kapan pun.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-primary bg-primary text-primary-foreground shadow-xl md:-translate-y-2"
                  : "border-border bg-card text-card-foreground"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Paling Populer
                </span>
              )}
              <h3 className="font-serif text-xl font-semibold">{plan.name}</h3>
              
              {/* AREA MODIFIKASI HARGA DISKON */}
              <div className="mt-4 flex flex-col justify-end min-h-[60px]">
                {plan.originalPrice && (
                  <span className={`text-sm line-through ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground/50"}`}>
                    {plan.originalPrice}
                  </span>
                )}
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className={plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <p className={`mt-3 text-sm leading-relaxed ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {plan.description}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? "text-accent" : "text-primary"}`}
                      aria-hidden="true"
                    />
                    <span className={plan.highlighted ? "text-primary-foreground/90" : "text-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* ── LOGIKA TAUTAN DINAMIS TERINTEGRASI ── */}
              <a 
                href={plan.href}
                target={plan.external ? "_blank" : "_self"}
                rel={plan.external ? "noopener noreferrer" : undefined}
              >
                <Button
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "secondary" : "default"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
