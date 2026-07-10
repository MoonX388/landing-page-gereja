"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react"

export default function KarierPage() {
  const jobs = [
    {
      title: "Senior Full Stack Developer",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      department: "Engineering",
      experience: "3+ years",
      description: "Kami mencari senior developer yang berpengalaman dalam Next.js dan Node.js untuk bergabung dengan tim kami.",
    },
    {
      title: "Product Manager",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      department: "Product",
      experience: "2+ years",
      description: "Kelola dan kembangkan fitur-fitur baru berdasarkan kebutuhan customer dan market research.",
    },
    {
      title: "Customer Success Manager",
      location: "Hybrid (Jakarta)",
      type: "Full-time",
      department: "Customer Success",
      experience: "1+ year",
      description: "Pastikan kepuasan customer dan bantu gereja mencapai kesuksesan dengan platform kami.",
    },
    {
      title: "UI/UX Designer",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      department: "Design",
      experience: "2+ years",
      description: "Desain interface yang beautiful dan functional untuk meningkatkan user experience platform.",
    },
    {
      title: "DevOps Engineer",
      location: "Remote",
      type: "Full-time",
      department: "Engineering",
      experience: "3+ years",
      description: "Kelola infrastructure dan ensure platform kami running smoothly dengan zero downtime.",
    },
    {
      title: "Sales Executive",
      location: "Various (Indonesia)",
      type: "Full-time",
      department: "Sales",
      experience: "1+ year",
      description: "Jual solusi GerejaPintar ke gereja-gereja dan bantu mereka transform digitally.",
    },
  ]

  const benefits = [
    "Gaji kompetitif dengan tunjangan kesehatan dan asuransi",
    "Flexible working hours dan remote work options",
    "Training dan development budget untuk professional growth",
    "Team outing dan company events yang menyenangkan",
    "Equity/stock option untuk full-time employees",
    "Friendly team environment yang supportive",
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
                Karier di GerejaPintar
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Bergabunglah dengan tim kami yang passionate tentang transformasi digital gereja dan membuat dampak positif.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
              Mengapa Bergabung Dengan GerejaPintar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="p-6 bg-background border border-border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/20 mb-4" />
                  <p className="text-foreground font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12">
              Lowongan Pekerjaan Terbuka
            </h2>

            {jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div
                    key={index}
                    className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full whitespace-nowrap ml-4">
                        {job.experience}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">{job.description}</p>

                    <a href="/kontak">
                      <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                        Lamar Sekarang
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  Saat ini tidak ada lowongan pekerjaan terbuka
                </p>
                <p className="text-muted-foreground">
                  Silakan hubungi kami jika tertarik bergabung dengan tim GerejaPintar
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Budaya Tim Kami
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Kami percaya bahwa budaya perusahaan adalah fondasi kesuksesan. Di GerejaPintar, kami membangun tim yang:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span><strong>Passionate:</strong> Peduli tentang misi kami untuk transformasi digital gereja</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span><strong>Collaborative:</strong> Bekerja sama dan saling support untuk mencapai tujuan bersama</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span><strong>Innovative:</strong> Terus mencari cara baru dan lebih baik untuk solve problems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span><strong>Customer-centric:</strong> Selalu thinking tentang how to better serve our customers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span><strong>Growth-oriented:</strong> Committed untuk personal dan professional development</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Tidak Menemukan Posisi yang Sesuai?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Kami selalu mencari talent yang passionate. Kirimkan CV dan portfolio Anda ke kami.
            </p>
            <a href="mailto:careers@gerejapintar.id">
              <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Hubungi Kami
              </button>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
