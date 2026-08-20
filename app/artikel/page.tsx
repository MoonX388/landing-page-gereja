"use client"

import { useEffect, useMemo, useState } from "react"
import { Calendar, CheckCircle2, FileUp, Loader2, PencilLine, Search, User } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/app/context/AuthContext"
import api from "@/lib/api"

type Article = { id: number; title: string; excerpt: string; content: string; category: string; authorName: string; churchName: string; publishedAt: string }

export default function ArtikelPage() {
  const { user } = useAuth()
  const [articles, setArticles] = useState<Article[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showEditor, setShowEditor] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [form, setForm] = useState({ title: "", category: "Warta Gereja", excerpt: "", content: "" })

  useEffect(() => {
    api.get("/auth/public-articles")
      .then((response) => setArticles(response.data || []))
      .catch(() => setError("Artikel belum dapat dimuat saat ini."))
      .finally(() => setLoading(false))
  }, [])

  const filteredArticles = useMemo(
    () => articles.filter((article) => `${article.title} ${article.excerpt} ${article.churchName}`.toLowerCase().includes(query.toLowerCase())),
    [articles, query],
  )

  const updateForm = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))

  const submitArticle = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setSaved(false)
    setError("")
    try {
      const response = await api.post("/auth/articles", form)
      setArticles((current) => [response.data, ...current])
      setForm({ title: "", category: "Warta Gereja", excerpt: "", content: "" })
      setSaved(true)
    } catch (submitError: any) {
      setError(submitError.response?.data?.message || "Artikel gagal disimpan.")
    } finally {
      setSaving(false)
    }
  }

  const uploadWarta = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedFile) {
      setError("Pilih file .docx, .pdf, atau .txt terlebih dahulu.")
      return
    }
    setUploading(true)
    setSaved(false)
    setError("")
    try {
      const payload = new FormData()
      payload.append("file", selectedFile)
      const response = await api.post("/warta/upload", payload, { headers: { "Content-Type": "multipart/form-data" } })
      setArticles((current) => [response.data, ...current])
      setSelectedFile(null)
      setSaved(true)
      const input = document.getElementById("warta-file") as HTMLInputElement | null
      if (input) input.value = ""
    } catch (uploadError: any) {
      setError(uploadError.response?.data?.message || "File warta gagal diproses.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary/30 px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Warta & Artikel</p>
            <h1 className="max-w-3xl text-4xl font-serif font-bold tracking-tight text-foreground md:text-6xl">Cerita, kabar, dan inspirasi gereja.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Baca kabar terbaru dari gereja-gereja yang bertumbuh bersama GerejaPintar.</p>
            <div className="relative mt-10 max-w-xl"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari artikel atau nama gereja..." className="h-12 rounded-xl bg-background pl-10" /></div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            {user?.role === "admin_gereja" && <div className="mb-10 rounded-xl border border-primary/20 bg-secondary/20 p-5"><button type="button" onClick={() => setShowEditor((current) => !current)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><PencilLine className="h-4 w-4" />{showEditor ? "Tutup editor" : "Tulis artikel gereja"}</button>{showEditor && <div className="mt-5 space-y-6"><form onSubmit={submitArticle} className="grid gap-4 md:grid-cols-2"><Input required value={form.title} onChange={(event) => updateForm("title", event.target.value)} placeholder="Judul artikel" /><Input required value={form.category} onChange={(event) => updateForm("category", event.target.value)} placeholder="Kategori" /><Input required value={form.excerpt} onChange={(event) => updateForm("excerpt", event.target.value)} placeholder="Ringkasan singkat" className="md:col-span-2" /><textarea required value={form.content} onChange={(event) => updateForm("content", event.target.value)} placeholder="Tulis isi artikel..." className="min-h-40 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring md:col-span-2" /><div className="flex items-center gap-3 md:col-span-2"><Button type="submit" disabled={saving} className="rounded-lg">{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : "Terbitkan artikel"}</Button>{saved && <span className="flex items-center gap-1 text-sm text-emerald-600"><CheckCircle2 className="h-4 w-4" />Artikel terbit</span>}</div></form><div className="border-t border-border pt-5"><p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground"><FileUp className="h-4 w-4 text-primary" />Impor berita jemaat dari dokumen</p><form onSubmit={uploadWarta} className="flex flex-col gap-3 sm:flex-row sm:items-center"><input id="warta-file" type="file" accept=".docx,.pdf,.txt" onChange={(event) => setSelectedFile(event.target.files?.[0] || null)} className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /><Button type="submit" disabled={uploading} className="rounded-lg sm:shrink-0">{uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memproses...</> : "Upload & Terbitkan"}</Button></form><p className="mt-2 text-xs text-muted-foreground">Format .docx, .pdf, atau .txt. Ukuran maksimum 10 MB.</p></div></div>}</div>}
            {error && <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
            {loading ? <p className="text-sm text-muted-foreground">Memuat artikel...</p> : filteredArticles.length > 0 ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filteredArticles.map((article) => <article key={article.id} className="flex flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"><span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{article.category}</span><h2 className="mt-5 text-xl font-semibold leading-snug text-foreground">{article.title}</h2><p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p><div className="mt-auto flex items-center gap-3 border-t border-border pt-5"><User className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">{article.authorName} · {article.churchName}</span><span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" />{new Date(article.publishedAt).toLocaleDateString("id-ID")}</span></div></article>)}</div> : <p className="text-sm text-muted-foreground">Belum ada artikel yang cocok.</p>}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
