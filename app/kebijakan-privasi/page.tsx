import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Kebijakan Privasi GerejaPintar",
  description: "Kebijakan privasi GerejaPintar menjelaskan bagaimana kami mengumpulkan dan melindungi data Anda.",
}

export default function KebijaksanPrivasiPage() {
  const sections = [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      content: `Kami mengumpulkan informasi yang Anda berikan secara langsung saat:
• Mendaftar akun
• Menggunakan layanan
• Menghubungi dukungan pelanggan
• Mengikuti survey atau feedback

Informasi yang dikumpulkan meliputi nama, email, nomor telepon, data profil gereja, dan informasi terkait penggunaan layanan.`,
    },
    {
      title: "2. Bagaimana Kami Menggunakan Informasi Anda",
      content: `Kami menggunakan informasi Anda untuk:
• Menyediakan dan meningkatkan layanan
• Mengirimkan notifikasi dan update
• Merespons pertanyaan dan permintaan Anda
• Melakukan analisis dan riset
• Memastikan keamanan dan mencegah fraud
• Mematuhi kewajiban hukum`,
    },
    {
      title: "3. Keamanan Data",
      content: `Kami menggunakan enkripsi SSL/TLS dan standar keamanan industri untuk melindungi data Anda. Semua transmisi data dienkripsi, dan kami melakukan backup regular untuk mencegah data loss. Namun, tidak ada metode transmisi internet yang 100% aman.`,
    },
    {
      title: "4. Berbagi Data Pihak Ketiga",
      content: `Kami tidak menjual data pribadi Anda. Kami hanya membagikan data dengan:
• Service provider yang membantu operasional kami
• Mitra teknologi (dengan persetujuan)
• Pihak yang diwajibkan oleh hukum
• Pihak lain dengan persetujuan eksplisit Anda`,
    },
    {
      title: "5. Hak Akses dan Kontrol Data",
      content: `Anda memiliki hak untuk:
• Mengakses data pribadi Anda
• Mengubah atau memperbaiki data
• Meminta penghapusan data (sesuai regulasi)
• Menolak pemrosesan data tertentu
• Melaporkan concern tentang privasi

Hubungi kami di privacy@gerejapintar.id untuk mengajukan permintaan.`,
    },
    {
      title: "6. Retensi Data",
      content: `Kami menyimpan data Anda selama Anda menggunakan layanan. Setelah akun dihapus, kami menghapus data dalam 30 hari, kecuali kami diwajibkan oleh hukum untuk menyimpannya lebih lama.`,
    },
    {
      title: "7. Perubahan Kebijakan Privasi",
      content: `Kami dapat mengubah kebijakan ini sewaktu-waktu. Kami akan memberitahu Anda melalui email atau halaman website jika ada perubahan material.`,
    },
    {
      title: "8. Hubungi Kami",
      content: `Jika Anda memiliki pertanyaan tentang kebijakan privasi kami, silakan hubungi:
Email: privacy@gerejapintar.id
Alamat: Jakarta, Indonesia`,
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
                Kebijakan Privasi
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Efektif mulai: 1 Januari 2024
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Kebijakan privasi kami menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.
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
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
