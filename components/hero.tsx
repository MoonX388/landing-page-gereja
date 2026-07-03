import Image from "next/image"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = ["Tanpa kartu kredit", "Gratis 14 hari", "Setup dalam hitungan menit"]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-24">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-sm font-medium text-muted-foreground">
            Platform manajemen gereja terpadu #1
          </span>
        </div>

        <h1 className="mx-auto max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          Kelola Gereja Anda dengan Cerdas & Terintegrasi
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          GerejaPintar menyatukan dashboard admin, bot WhatsApp berbasis AI, dan portal jemaat dalam
          satu platform. Data jemaat, keuangan, inventaris, hingga penjadwalan acara—semua dalam satu tempat.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group h-12 rounded-full px-7 text-base">
            <a href="#harga">
              Mulai Sekarang
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-base">
            <a href="#solusi">Lihat Demo</a>
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="relative mt-14">
          <div
            className="absolute inset-x-8 -top-6 bottom-10 rounded-[2rem] bg-primary/5"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
            <Image
              src="/dashboard-preview.png"
              alt="Tampilan dashboard admin GerejaPintar menampilkan data jemaat, kehadiran, dan keuangan"
              width={1600}
              height={1000}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
