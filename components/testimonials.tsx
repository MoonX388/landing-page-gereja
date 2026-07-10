"use client"

import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Sejak memakai GerejaPintar, administrasi jemaat dan keuangan jadi jauh lebih rapi. Laporan bulanan yang dulu butuh berhari-hari kini selesai dalam hitungan menit.",
    name: "Pdt. Samuel Wijaya",
    role: "Gembala Sidang, GBI Anugerah",
  },
  {
    quote:
      "Bot WhatsApp-nya luar biasa membantu. Jemaat bisa tanya jadwal ibadah kapan saja tanpa harus menunggu admin membalas.",
    name: " Diaken Maria Tobing",
    role: "Sekretariat, GKI Pelita",
  },
  {
    quote:
      "Portal jemaat membuat anggota kami lebih terlibat. Data kehadiran dan pelayanan sekarang akurat dan mudah dipantau.",
    name: "Yohanes Prasetyo",
    role: "Koordinator Pelayanan, HKBP Sejahtera",
  },
]

export function Testimonials() {
  return (
    <section id="testimoni" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">Testimoni</span>
        <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Dipercaya ratusan gereja di Indonesia
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <Quote className="h-8 w-8 text-accent" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-4">
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
