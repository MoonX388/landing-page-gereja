"use client"

import Image from "next/image"
import { Bot, LayoutDashboard, Smartphone, Check } from "lucide-react"

const botPoints = [
  "Chat interaktif 24/7 dengan AI lokal yang responsif",
  "Terhubung via QR Code atau Pairing Code",
  "Menjawab info jadwal ibadah & data jemaat secara personal",
  "Perintah admin berbasis prefix untuk kontrol penuh",
]

const portalPoints = [
  "Registrasi & login jemaat yang mudah dan aman",
  "Kelola profil serta akses informasi gereja mandiri",
  "Terhubung langsung dengan bot WhatsApp gereja",
  "Antarmuka ringan yang nyaman di semua perangkat",
]

export function Solutions() {
  return (
    <section id="solusi" className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl space-y-24 px-4 py-20 sm:px-6 sm:py-28">
        {/* WhatsApp Bot */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Bot className="h-4 w-4" aria-hidden="true" />
              Bot WhatsApp AI
            </span>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Asisten gereja pintar di ujung jari jemaat
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Bot WhatsApp berbasis AI menjawab pertanyaan jemaat kapan saja, memberikan informasi
              personal, dan membantu tim pelayanan bekerja lebih efisien.
            </p>
            <ul className="mt-6 space-y-3">
              {botPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
            <Image
              src="/whatsapp-bot.png"
              alt="Percakapan WhatsApp antara jemaat dan bot AI gereja"
              width={800}
              height={900}
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Jemaat Portal */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">Portal Jemaat</div>
                  <div className="text-xs text-muted-foreground">gerejapintar.com/jemaat</div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {["Selamat datang, Andreas", "Ibadah Minggu — 08.00 WIB", "Persekutuan Doa — Rabu 19.00", "Profil saya diperbarui"].map(
                  (row, i) => (
                    <div
                      key={row}
                      className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3"
                    >
                      <span className="text-sm text-foreground">{row}</span>
                      <span
                        className={`h-2 w-2 rounded-full ${i === 0 ? "bg-accent" : "bg-primary/40"}`}
                        aria-hidden="true"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Portal Jemaat
            </span>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Libatkan jemaat lewat portal mandiri
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Beri jemaat akses langsung ke informasi gereja, jadwal kegiatan, dan profil mereka
              sendiri. Semua terhubung mulus dengan sistem admin dan bot WhatsApp.
            </p>
            <ul className="mt-6 space-y-3">
              {portalPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
