import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Syarat Layanan GerejaPintar",
  description: "Syarat dan ketentuan penggunaan platform GerejaPintar.",
}

export default function SyaratLayananPage() {
  const sections = [
    {
      title: "1. Penerimaan Syarat",
      content: `Dengan mengakses dan menggunakan GerejaPintar, Anda menerima dan setuju untuk terikat oleh syarat-syarat ini. Jika Anda tidak setuju dengan bagian manapun dari syarat ini, kami sarankan Anda tidak menggunakan layanan kami.`,
    },
    {
      title: "2. Deskripsi Layanan",
      content: `GerejaPintar adalah platform manajemen gereja berbasis cloud yang menyediakan fitur-fitur untuk manajemen data jemaat, keuangan, penjadwalan, dan laporan. Kami berhak untuk memodifikasi atau menghentikan layanan dengan notifikasi 30 hari sebelumnya.`,
    },
    {
      title: "3. Akun Pengguna",
      content: `Anda bertanggung jawab untuk:
• Menjaga kerahasiaan password Anda
• Semua aktivitas yang terjadi di bawah akun Anda
• Memberitahu kami tentang penggunaan tidak sah

Anda harus memberikan informasi yang akurat dan lengkap saat mendaftar.`,
    },
    {
      title: "4. Penggunaan Layanan",
      content: `Anda setuju untuk:
• Menggunakan layanan hanya untuk tujuan sah
• Tidak menggunakan layanan untuk aktivitas ilegal
• Tidak mengganggu atau merusak infrastruktur kami
• Tidak mencoba akses tidak sah atau reverse engineer
• Mematuhi semua hukum dan regulasi yang berlaku`,
    },
    {
      title: "5. Data Anda",
      content: `Anda mempertahankan kepemilikan penuh atas data Anda. Dengan menggunakan layanan kami, Anda memberikan lisensi kepada kami untuk memproses, menyimpan, dan menampilkan data sesuai dengan kebijakan privasi kami. Anda bertanggung jawab untuk backup data secara regular.`,
    },
    {
      title: "6. Kualitas Layanan",
      content: `Kami berkomitmen untuk uptime 99.9% dan keamanan data. Namun, kami tidak menjamin:
• Akses tanpa interupsi
• Kecepatan transfer data tertentu
• Hasil dari penggunaan layanan
• Layanan bebas dari error atau malfunction`,
    },
    {
      title: "7. Pembayaran",
      content: `Harga dan paket dapat berubah dengan notifikasi 30 hari. Semua pembayaran non-refundable kecuali dinyatakan lain. Kami menggunakan payment processor terpercaya untuk keamanan transaksi Anda.`,
    },
    {
      title: "8. Penghentian Akun",
      content: `Kami berhak untuk menghentikan akun Anda jika:
• Melanggar syarat-syarat ini
• Tidak membayar tagihan
• Menggunakan layanan untuk tujuan tidak sah
• Tidak aktif selama 12 bulan berturut-turut

Anda bisa menutup akun Anda kapan saja.`,
    },
    {
      title: "9. Batasan Tanggung Jawab",
      content: `Sejauh yang diizinkan hukum, kami tidak bertanggung jawab atas:
• Kerugian tidak langsung atau konsekuensial
• Hilangnya data (kecuali karena kesalahan kami)
• Downtime atau gangguan layanan
• Penggunaan tidak sah akun Anda

Tanggung jawab kami terbatas pada jumlah yang Anda bayarkan dalam 12 bulan terakhir.`,
    },
    {
      title: "10. Indemnifikasi",
      content: `Anda setuju untuk melindungi, membela, dan mengganti rugi kami terhadap klaim, kerugian, atau kerusakan yang timbul dari penggunaan layanan Anda atau pelanggaran syarat-syarat ini.`,
    },
    {
      title: "11. Perubahan Syarat",
      content: `Kami dapat mengubah syarat-syarat ini kapan saja. Kami akan memberitahu pengguna melalui email atau halaman website. Penggunaan layanan berkelanjutan setelah perubahan berarti Anda menerima syarat baru.`,
    },
    {
      title: "12. Hukum dan Yurisdiksi",
      content: `Syarat-syarat ini diatur oleh hukum Indonesia. Setiap perselisihan akan diselesaikan melalui pengadilan di Jakarta, Indonesia.`,
    },
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
                Syarat Layanan
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Efektif mulai: 1 Januari 2024
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Syarat dan ketentuan penggunaan platform GerejaPintar.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Last Updated */}
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Terakhir diperbarui: 1 Januari 2024
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Jika Anda memiliki pertanyaan tentang syarat-syarat ini, hubungi legal@gerejapintar.id
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
