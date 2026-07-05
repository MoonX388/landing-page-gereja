import { Church } from "lucide-react"

const columns = [
  {
    title: "Produk",
    links: [
      { label: "Fitur", href: "#fitur" },
      { label: "Solusi", href: "#solusi" },
      { label: "Harga", href: "#harga" },
      { label: "Demo", href: "https://demo.gerejapintar.id" },
      { label: "Keamanan", href: "#keamanan" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "#tentang" },
      { label: "Blog", href: "#blog" },
      { label: "Karier", href: "#karier" },
      { label: "Mitra", href: "#mitra" },
      { label: "Kontak", href: "mailto:contact@gerejapintar.id" },
    ],
  },
  {
    title: "Dukungan",
    links: [
      { label: "Pusat Bantuan", href: "#bantuan" },
      { label: "Dokumentasi", href: "https://docs.gerejapintar.id" },
      { label: "Status Sistem", href: "#status" },
      { label: "Kebijakan Privasi", href: "#privasi" },
      { label: "Syarat Layanan", href: "#syarat" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Church className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-semibold text-foreground">GerejaPintar</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Platform manajemen gereja digital terpadu untuk melayani jemaat dengan lebih baik.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GerejaPintar.id. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-sm text-muted-foreground">Dibuat dengan kasih untuk gereja Indonesia.</p>
        </div>
      </div>
    </footer>
  )
}
