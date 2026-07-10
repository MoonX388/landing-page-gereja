"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function StatusSistemPage() {
  const services = [
    {
      name: "Platform Web",
      status: "operational",
      uptime: "99.98%",
      lastCheck: "Baru saja",
    },
    {
      name: "API Server",
      status: "operational",
      uptime: "99.99%",
      lastCheck: "Baru saja",
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.98%",
      lastCheck: "Baru saja",
    },
    {
      name: "Email Service",
      status: "operational",
      uptime: "99.95%",
      lastCheck: "2 menit lalu",
    },
    {
      name: "WhatsApp Integration",
      status: "operational",
      uptime: "99.90%",
      lastCheck: "Baru saja",
    },
    {
      name: "Backup System",
      status: "operational",
      uptime: "99.99%",
      lastCheck: "1 jam lalu",
    },
  ]

  const incidents = [
    {
      date: "5 Januari 2024",
      service: "Email Service",
      status: "resolved",
      duration: "15 menit",
      description: "Email notification mengalami delay. Sudah selesai.",
    },
    {
      date: "1 Januari 2024",
      service: "Platform Web",
      status: "resolved",
      duration: "8 menit",
      description: "Brief downtime untuk maintenance. Sudah selesai.",
    },
  ]

  const getStatusIcon = (status: string) => {
    if (status === "operational") {
      return <CheckCircle className="h-5 w-5 text-green-600" />
    } else if (status === "maintenance") {
      return <Clock className="h-5 w-5 text-yellow-600" />
    } else {
      return <AlertCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    if (status === "operational") return "bg-green-100 text-green-800"
    if (status === "maintenance") return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getStatusText = (status: string) => {
    if (status === "operational") return "Operasional"
    if (status === "maintenance") return "Maintenance"
    return "Gangguan"
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Status Sistem
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <p className="text-xl text-green-600 font-medium">Semua Layanan Normal</p>
              </div>
              <p className="text-muted-foreground">
                Pantau status real-time layanan GerejaPintar
              </p>
            </div>
          </div>
        </section>

        {/* Services Status */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Status Layanan
            </h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 border border-border rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(service.status)}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Last check: {service.lastCheck}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                      {getStatusText(service.status)}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Incidents History */}
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Riwayat Insiden
            </h2>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <div
                  key={index}
                  className="p-6 bg-background border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {incident.service}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {incident.date} • {incident.duration}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Selesai
                    </span>
                  </div>
                  <p className="text-muted-foreground">{incident.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Uptime Stats */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
              Statistik Uptime
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { period: "Hari Ini", uptime: "99.99%" },
                { period: "7 Hari", uptime: "99.98%" },
                { period: "30 Hari", uptime: "99.97%" },
                { period: "90 Hari", uptime: "99.98%" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 border border-border rounded-lg text-center"
                >
                  <p className="text-muted-foreground text-sm mb-2">{stat.period}</p>
                  <p className="text-4xl font-bold text-primary">{stat.uptime}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="py-16 md:py-24 bg-secondary/30 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
              Subscribe untuk Update
            </h2>
            <div className="p-6 bg-background border border-border rounded-lg">
              <p className="text-muted-foreground mb-4">
                Dapatkan notifikasi saat ada maintenance atau insiden layanan. Masukkan email Anda di bawah.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
