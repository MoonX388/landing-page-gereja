"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16 md:py-20">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold text-balance md:text-4xl">
          Siap membawa pelayanan gereja Anda ke era digital?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80 leading-relaxed text-pretty">
          Bergabunglah dengan ratusan gereja yang telah memercayakan pengelolaan jemaat kepada GerejaPintar.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#harga">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Mulai Gratis Sekarang
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </a>
          <a href="https://demo.gerejapintar.id">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
            >
              Lihat Demo
            </Button>
          </a>
        </div>
        <p className="mt-6 text-sm text-primary-foreground/70">
          Tidak perlu kartu kredit &middot; Uji coba 14 hari &middot; Batalkan kapan saja
        </p>
      </div>
    </section>
  )
}
