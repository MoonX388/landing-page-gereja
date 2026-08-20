"use client"

import { useState } from "react"
import { Church, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Fitur", href: "/fitur" },
  { label: "Artikel", href: "/artikel" },
  { label: "Solusi", href: "/solusi" },
  { label: "Harga", href: "/#harga" },
  { label: "Not Angka", href: "/not-angka" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Daftar Gereja", href: "/daftar-gereja" }
  
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        
        {/* Logo di Kiri */}
        <a href="/" className="flex items-center gap-2 z-10">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Church className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Gereja<span className="text-accent-foreground">Pintar</span>
          </span>
        </a>

        {/* Navigasi Desktop (Hanya muncul di layar besar / lg ke atas) */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Tombol Auth Desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Masuk
          </a>
          <a href="/register" className="inline-flex h-8 items-center justify-center rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80">
            Daftar Gratis
          </a>
        </div>

        {/* Tombol Toggle Mobile & Tablet (Muncul sampai layar medium/tablet, hilang di lg) */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground lg:hidden z-10"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigasi Mobile & Tablet dengan Animasi Turun (Slide Down) */}
      <div
        className={`grid transition-all duration-300 ease-in-out lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/60 bg-background">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Navigasi seluler">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="w-full text-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <a href="/login" className="inline-flex h-8 items-center justify-center rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground transition-all hover:bg-muted">
                  Masuk
                </a>
                <a href="/register" className="inline-flex h-8 items-center justify-center rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80">
                  Daftar Gratis
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}