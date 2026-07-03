import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Features } from "@/components/features"
import { Solutions } from "@/components/solutions"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Solutions />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
