const stats = [
  { value: "500+", label: "Gereja terdaftar" },
  { value: "120rb", label: "Data jemaat dikelola" },
  { value: "99,9%", label: "Uptime layanan" },
  { value: "24/7", label: "Bot AI aktif" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
