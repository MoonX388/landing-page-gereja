"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Calendar, User } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      title: "5 Cara Meningkatkan Keterlibatan Jemaat di Era Digital",
      excerpt: "Pelajari strategi terbukti untuk meningkatkan keterlibatan jemaat melalui komunikasi digital yang efektif.",
      date: "15 Januari 2024",
      author: "Maya Wijaya",
      category: "Engagement",
      readTime: "5 min",
    },
    {
      title: "Transformasi Digital Gereja: Panduan Langkah Demi Langkah",
      excerpt: "Panduan komprehensif untuk memulai transformasi digital gereja Anda dari nol hingga implementasi penuh.",
      date: "10 Januari 2024",
      author: "Ahmad Ibrahim",
      category: "Tips",
      readTime: "8 min",
    },
    {
      title: "Keamanan Data Gereja di Cloud: Apa yang Perlu Anda Ketahui",
      excerpt: "Pelajari tentang keamanan data gereja saat menggunakan platform cloud dan best practices untuk perlindungan data.",
      date: "5 Januari 2024",
      author: "Budi Santoso",
      category: "Keamanan",
      readTime: "6 min",
    },
    {
      title: "Otomasi Komunikasi Gereja dengan WhatsApp Integration",
      excerpt: "Bagaimana menggunakan otomasi WhatsApp untuk komunikasi gereja yang lebih efisien dan personal.",
      date: "1 Januari 2024",
      author: "Ridho Pratama",
      category: "Teknologi",
      readTime: "7 min",
    },
    {
      title: "Transparansi Keuangan Gereja: Cara Membangun Kepercayaan Jemaat",
      excerpt: "Mengapa transparansi keuangan penting dan bagaimana mengkomunikasikannya kepada jemaat dengan efektif.",
      date: "28 Desember 2023",
      author: "Maya Wijaya",
      category: "Keuangan",
      readTime: "5 min",
    },
    {
      title: "Memilih Platform Manajemen Gereja yang Tepat untuk Gereja Anda",
      excerpt: "Kriteria dan checklist untuk memilih platform manajemen gereja yang paling sesuai dengan kebutuhan Anda.",
      date: "20 Desember 2023",
      author: "Ahmad Ibrahim",
      category: "Tips",
      readTime: "6 min",
    },
  ]

  const categories = [
    { name: "Semua", count: 24 },
    { name: "Tips", count: 8 },
    { name: "Teknologi", count: 6 },
    { name: "Keamanan", count: 4 },
    { name: "Keuangan", count: 3 },
    { name: "Engagement", count: 3 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Trik Metadata untuk Client Component */}
      <title>Blog GerejaPintar | Artikel, Tips & Tren Manajemen Gereja</title>
      <meta name="description" content="Baca artikel terbaru tentang manajemen gereja, transformasi digital, dan best practices untuk gereja modern." />

      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Blog GerejaPintar
              </h1>
              <p className="text-xl text-muted-foreground">
                Artikel, tips, dan insights tentang manajemen gereja modern dan transformasi digital
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="p-6 border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Kategori</h3>
                  <div className="space-y-2">
                    {categories.map((cat, index) => (
                      <a
                        key={index}
                        href="#"
                        className="flex items-center justify-between p-2 rounded hover:bg-secondary/30 transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <span className="text-sm">{cat.name}</span>
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          {cat.count}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-6 bg-secondary/30 border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Newsletter</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dapatkan artikel terbaru langsung ke inbox Anda
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email Anda"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Blog Posts */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {posts.map((post, index) => (
                    <article
                      key={index}
                      className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors group"
                    >
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="mb-3">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center gap-2">
                  <button className="px-4 py-2 rounded-lg border border-border hover:border-primary text-foreground transition-colors">
                    Sebelumnya
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-primary bg-primary/10 text-primary font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:border-primary transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:border-primary transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border hover:border-primary text-foreground transition-colors">
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}