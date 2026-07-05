import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Users, Target, Heart, Globe } from "lucide-react"

export const metadata = {
  title: "Tentang GerejaPintar | Misi & Visi Kami",
  description: "Pelajari tentang GerejaPintar, misi kami untuk transformasi digital gereja, dan tim yang berdedikasi.",
}

export default function TentangKamiPage() {
  const values = [
    {
      icon: Heart,
      title: "Berbakti",
      description: "Kami percaya pada kekuatan gereja dan berkomitmen untuk melayani dengan sepenuh hati.",
    },
    {
      icon: Target,
      title: "Inovasi",
      description: "Kami terus berinovasi untuk memberikan solusi terbaik dan terdepan untuk gereja.",
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Kami bekerja sama dengan gereja untuk memahami dan memenuhi kebutuhan mereka.",
    },
    {
      icon: Globe,
      title: "Pertumbuhan",
      description: "Kami mendukung pertumbuhan gereja dan komunitas Kristen di seluruh dunia.",
    },
  ]

  const team = [
    {
      name: "Ridho Pratama",
      role: "Founder & CEO",
      bio: "Visioner yang bersemangat tentang transformasi digital gereja. Pengalaman 10 tahun di software development.",
    },
    {
      name: "Budi Santoso",
      role: "CTO",
      bio: "Ahli teknologi dengan track record membangun sistem scalable. Berpengalaman di fintech dan enterprise solutions.",
    },
    {
      name: "Maya Wijaya",
      role: "Head of Product",
      bio: "Product manager berpengalaman yang fokus pada user experience dan kebutuhan customer.",
    },
    {
      name: "Ahmad Ibrahim",
      role: "Head of Community",
      bio: "Community builder yang passionate tentang connecting churches dan fostering collaboration.",
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
                Tentang GerejaPintar
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Kami membangun solusi digital untuk transformasi gereja modern, sehingga gereja bisa fokus pada misi spiritual mereka.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Kisah Kami</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                GerejaPintar dimulai dari sebuah visi sederhana namun kuat: membantu gereja di Indonesia mengelola operasional mereka dengan lebih efisien melalui teknologi digital. Pendiri kami, Ridho Pratama, menyadari bahwa banyak gereja masih menggunakan spreadsheet dan sistem manual untuk mengelola data jemaat, keuangan, dan acara.
              </p>
              <p>
                Setelah mengobservasi beberapa gereja dan mendengarkan kebutuhan mereka, kami memulai pengembangan GerejaPintar pada tahun 2022. Melalui feedback langsung dari pastors, admin gereja, dan jemaat, kami mengembangkan platform yang tidak hanya powerful tapi juga mudah digunakan.
              </p>
              <p>
                Hari ini, GerejaPintar telah membantu lebih dari 500 gereja di Indonesia dalam mengelola jemaat mereka dengan lebih baik. Kami bangga menjadi bagian dari transformasi digital gereja-gereja di Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-8 bg-background border border-border rounded-lg">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Misi Kami</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Memberdayakan gereja-gereja di Indonesia dengan teknologi digital yang terjangkau, mudah digunakan, dan aman, sehingga mereka bisa fokus pada misi spiritual dan pelayanan jemaat.
                </p>
              </div>
              <div className="p-8 bg-background border border-border rounded-lg">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Visi Kami</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi platform manajemen gereja terdepan di Asia Tenggara yang mendukung pertumbuhan spiritual dan organisasi gereja melalui teknologi yang inovatif dan berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Nilai-Nilai Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="p-6 border border-border rounded-lg text-center">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Tim Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="p-6 bg-background border border-border rounded-lg text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-primary">
                      {member.name.split(" ").map((n: string) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-3 font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Bergabunglah Dengan Kami
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Kami mencari individu yang passionate tentang teknologi dan pengembangan komunitas gereja.
            </p>
            <a href="/karier">
              <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Lihat Lowongan Pekerjaan
              </button>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
