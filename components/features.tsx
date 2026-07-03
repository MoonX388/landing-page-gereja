import {
  Users,
  Wallet,
  Boxes,
  CalendarCheck,
  BellRing,
  FileText,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Manajemen Jemaat",
    desc: "Data anggota lengkap, kartu keluarga, dan pelayan gereja tersimpan rapi dengan akses berbasis peran.",
  },
  {
    icon: Wallet,
    title: "Keuangan & Akuntansi",
    desc: "Catat persembahan, pengeluaran, dan laporan keuangan secara transparan serta mudah diaudit.",
  },
  {
    icon: Boxes,
    title: "Inventaris & Aset",
    desc: "Pantau seluruh aset dan inventaris gereja, dari alat musik hingga perlengkapan ibadah.",
  },
  {
    icon: CalendarCheck,
    title: "Jadwal & Absensi",
    desc: "Kelola jadwal acara, ibadah, dan tracking kehadiran jemaat maupun pelayan secara otomatis.",
  },
  {
    icon: BellRing,
    title: "Notifikasi Broadcast",
    desc: "Kirim pengumuman penting ke seluruh jemaat langsung melalui WhatsApp dalam satu klik.",
  },
  {
    icon: FileText,
    title: "Laporan & Dokumen",
    desc: "Ekspor data dan buat laporan komprehensif untuk kebutuhan administrasi gereja Anda.",
  },
]

export function Features() {
  return (
    <section id="fitur" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Semua dalam satu platform
        </span>
        <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Fitur lengkap untuk gereja modern
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Tinggalkan pencatatan manual. Kelola setiap aspek pelayanan gereja Anda dari satu dashboard yang intuitif.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
