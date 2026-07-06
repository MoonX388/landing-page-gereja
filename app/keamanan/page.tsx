import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Lock, Server, Eye, Shield, Key, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Keamanan Data GerejaPintar | Enkripsi & Perlindungan Tingkat Enterprise",
  description: "Keamanan data gereja adalah prioritas utama. Pelajari tentang enkripsi, backup, dan perlindungan data kami.",
}

export default function KeamananPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Enkripsi SSL/TLS",
      description: "Semua data dienkripsi saat transit menggunakan standar industri terbaru",
    },
    {
      icon: Server,
      title: "Data Center Aman",
      description: "Server kami berlokasi di data center dengan keamanan fisik berlapis",
    },
    {
      icon: Key,
      title: "Autentikasi Kuat",
      description: "Two-factor authentication dan password encryption untuk akun admin",
    },
    {
      icon: Shield,
      title: "Backup Otomatis",
      description: "Backup harian ke multiple location untuk disaster recovery",
    },
    {
      icon: Eye,
      title: "Monitoring 24/7",
      description: "Sistem monitoring berkelanjutan untuk mendeteksi aktivitas mencurigakan",
    },
    {
      icon: AlertCircle,
      title: "Compliance & Audit",
      description: "Memenuhi standar GDPR dan regulasi privasi data Indonesia",
    },
  ]

  const complianceItems = [
    "GDPR Compliant - Perlindungan data sesuai regulasi Uni Eropa",
    "PCI DSS - Aman untuk transaksi pembayaran online",
    "ISO 27001 - Manajemen keamanan informasi tersertifikasi",
    "Regulasi Privasi Indonesia - Sesuai dengan UU Privasi Data",
    "Audit Trail Lengkap - Semua aktivitas tercatat untuk audit",
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
                Keamanan Data Terdepan
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Keamanan data gereja Anda adalah prioritas utama kami. Kami menggunakan teknologi enkripsi dan perlindungan tingkat enterprise untuk melindungi informasi sensitif.
              </p>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Fitur Keamanan Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Rincian Teknis Keamanan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-background border border-border rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Enkripsi & Transmisi</h3>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">TLS 1.3 untuk semua komunikasi</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">AES-256 untuk enkripsi data at-rest</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">HTTPS certificate dari Trusted CA</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Password hashing dengan bcrypt + salt</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-background border border-border rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Akses & Otentikasi</h3>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">2FA dengan authenticator app</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Role-based access control (RBAC)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Session timeout otomatis</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">IP whitelist untuk admin</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-background border border-border rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Monitoring & Logging</h3>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Real-time security monitoring</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Detailed audit logs untuk audit trail</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Alert otomatis untuk aktivitas mencurigakan</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Penetration testing berkala</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-background border border-border rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Backup & Recovery</h3>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Backup harian ke 3 lokasi berbeda</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Recovery time objective (RTO) < 1 jam</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">99.9% uptime SLA guarantee</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-muted-foreground">Disaster recovery plan testing rutin</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
              Standar Kepatuhan
            </h2>
            <div className="p-8 border border-border rounded-lg bg-secondary/30">
              <ul className="space-y-4">
                {complianceItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 border-t border-border bg-secondary/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Pertanyaan Umum Keamanan
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Siapa yang bisa mengakses data gereja kami?",
                  a: "Hanya admin dan staff yang Anda berikan akses. Anda memiliki kontrol penuh atas siapa yang bisa melihat apa melalui role-based access control.",
                },
                {
                  q: "Apakah data kami aman dari serangan cyber?",
                  a: "Ya, kami menggunakan enkripsi tingkat enterprise, firewall berlapis, dan monitoring 24/7. Tim security kami secara proaktif mencari dan mengatasi kerentanan.",
                },
                {
                  q: "Bagaimana jika ada data loss atau bencana?",
                  a: "Kami memiliki backup otomatis setiap hari ke 3 lokasi berbeda. Kami bisa restore data dengan cepat dan memiliki disaster recovery plan yang teruji.",
                },
                {
                  q: "Apakah data saya bisa dihapus sepenuhnya?",
                  a: "Ya, Anda bisa request penghapusan data sepenuhnya. Kami akan menghapus semua data dalam 30 hari sesuai dengan regulasi privasi data.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-background border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
