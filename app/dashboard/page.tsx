"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Church, Globe, ShieldAlert, ArrowRight, Ban, CheckCircle, Trash2, MessageCircle } from "lucide-react"
import ConfirmationModal from "./components/ConfirmationModal"
import api from "@/lib/api"

export default function MasterDashboardPage() {
  const router = useRouter()
  const [churches, setChurches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedChurch, setSelectedChurch] = useState<{ id: number; namaGereja: string; isSuspended?: boolean } | null>(null)
  
  const [banModalOpen, setBanModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [deleteError, setDeleteError] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await api.get("/auth/master/churches")
      if (Array.isArray(res.data)) {
        setChurches(res.data)
      }
    } catch (err: any) {
      console.error("Gagal memuat data mitra:", err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    loadData() 
  }, [])

  const triggerBanModal = (id: number, namaGereja: string, isSuspended: boolean) => {
    setSelectedChurch({ id, namaGereja, isSuspended })
    setBanModalOpen(true)
  }

  const handleExecuteToggleSuspend = async () => {
    if (!selectedChurch) return
    try {
      const res = await api.patch(`/auth/master/churches/${selectedChurch.id}/toggle-suspend`)
      if (res.status === 200 || res.status === 204) {
        loadData()
      }
    } catch (err: any) { 
      alert(err.response?.data?.message || "Gagal memperbarui status suspensi klien.") 
    }
  }

  const triggerDeleteModal = (id: number, namaGereja: string) => {
    setSelectedChurch({ id, namaGereja })
    setDeleteConfirmText("")
    setDeleteError(false)
    setDeleteModalOpen(true)
  }

  const handleExecuteDeleteChurch = async () => {
    if (!selectedChurch) return
    const expectedMatch = `HAPUS PERMANEN ${selectedChurch.namaGereja.toUpperCase()}`
    if (deleteConfirmText.trim().toUpperCase() !== expectedMatch) {
      setDeleteError(true)
      return
    }

    try {
      const res = await api.delete(`/auth/master/churches/${selectedChurch.id}`)
      if (res.status === 200 || res.status === 204) {
        setDeleteModalOpen(false)
        loadData()
      }
    } catch (err: any) { 
      alert(err.response?.data?.message || "Gagal memusnahkan akun penyewa.") 
    }
  }

  return (
    <div className="w-full space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Master Pusat Overview</h1>
        <p className="text-muted-foreground">Panel kendali global platform SaaS GerejaPintar.</p>
      </div>

      {/* METRIK STATISTIK SINGKAT (Menggunakan bg-card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Mitra Gereja</p>
            <p className="text-2xl font-bold mt-1">{loading ? "..." : `${churches.length} Gereja`}</p>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-lg"><Church className="h-6 w-6" /></div>
        </div>
        
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Subdomain Aktif</p>
            <p className="text-2xl font-bold mt-1">{loading ? "..." : `${churches.filter(c => c.subdomain && !c.isSuspended).length} Live`}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg"><Globe className="h-6 w-6" /></div>
        </div>

        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Akun Banned / Suspend</p>
            <p className="text-2xl font-bold text-destructive mt-1">{loading ? "..." : `${churches.filter(c => c.isSuspended).length} Akun`}</p>
          </div>
          <div className="p-3 bg-destructive/10 text-destructive rounded-lg"><Ban className="h-6 w-6" /></div>
        </div>

        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Menunggu Review</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500 mt-1">{loading ? "..." : `${churches.filter(c => !c.isVerified).length} Request`}</p>
          </div>
          <div className="p-3 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 rounded-lg"><ShieldAlert className="h-6 w-6" /></div>
        </div>
      </div>

      {/* TABEL MANAJEMEN KLIEN UTAMA */}
      <Card className="shadow-sm border border-border w-full bg-card rounded-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-card-foreground">Manajemen Klien & Penegakan Kebijakan Akun</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-6">Sinkronisasi data tabel pusat...</p>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-medium bg-muted/50">
                  <th className="py-3 px-3">Nama Gereja</th>
                  <th className="py-3 px-3">Administrator</th>
                  <th className="py-3 px-3">Domain Pemetaan</th>
                  <th className="py-3 px-3">Status Sistem</th>
                  <th className="py-3 px-3 text-center">Tindakan Otoritas Super Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {churches.map((gereja) => (
                  <tr key={gereja.id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3.5 px-3 font-medium text-foreground">{gereja.namaGereja}</td>
                    <td className="py-3.5 px-3 text-muted-foreground">
                      <div>{gereja.namaAdmin}</div>
                      <div className="text-xs font-mono">{gereja.email}</div>
                    </td>
                    <td className="py-3.5 px-3 text-primary font-mono text-xs">
                      {gereja.subdomain ? `${gereja.subdomain}.gerejapintar.id` : "belum diatur"}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${gereja.isSuspended ? "bg-destructive/10 text-destructive" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}`}>
                        {gereja.isSuspended ? "Banned / Suspend" : "Aktif Normal"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 flex items-center justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="rounded-lg text-xs gap-1 h-8 text-foreground hover:text-primary hover:bg-primary/10"
                        disabled={!gereja.subdomain || gereja.isSuspended}
                        onClick={() => router.push(`/dashboard/${gereja.subdomain}`)}
                      >
                        Kelola Hub <ArrowRight className="h-3 w-3" />
                      </Button>

                      <Button 
                        variant={gereja.isSuspended ? "default" : "outline"}
                        size="sm"
                        className={`rounded-lg text-xs gap-1 h-8 ${gereja.isSuspended ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent" : "text-amber-700 border-amber-200 hover:bg-amber-500/10 dark:text-amber-500"}`}
                        onClick={() => triggerBanModal(gereja.id, gereja.namaGereja, !!gereja.isSuspended)}
                      >
                        {gereja.isSuspended ? <CheckCircle className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                        {gereja.isSuspended ? "Lepas Ban" : "Banned"}
                      </Button>

                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="rounded-lg text-xs gap-1 h-8 bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => triggerDeleteModal(gereja.id, gereja.namaGereja)}
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* MODAL 1: KONFIRMASI BAN / UNBAN KLIEN */}
      <ConfirmationModal 
        isOpen={banModalOpen}
        onClose={() => setBanModalOpen(false)}
        onConfirm={handleExecuteToggleSuspend}
        variant={selectedChurch?.isSuspended ? "success" : "danger"}
        title={selectedChurch?.isSuspended ? "Pulihkan Akses Sistem" : "Tangguhkan Akses Mitra"}
        description={
          selectedChurch?.isSuspended 
            ? `Apakah Anda yakin ingin melepas status banned untuk ${selectedChurch?.namaGereja}? Administrator hub instansi tersebut akan dapat login kembali.` 
            : `Apakah Anda yakin ingin memblokir akses kontrol ${selectedChurch?.namaGereja}? Seluruh hak kelola data jemaat akan diintersepsi dan dibekukan seketika.`
        }
        confirmText={selectedChurch?.isSuspended ? "Ya, Aktifkan Kembali" : "Ya, Blokir Sekarang"}
        cancelText="Batal"
      />

      {/* MODAL 2: KONFIRMASI PENGHAPUSAN KRITIS */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setDeleteModalOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-card p-6 text-left shadow-2xl border border-border font-sans animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1 mt-1">
                <h3 className="text-base font-bold text-card-foreground">Peringatan Kritis Super Admin</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Tindakan ini akan memusnahkan database <strong className="text-destructive font-bold">{selectedChurch?.namaGereja}</strong> secara mutlak. Seluruh data keuangan, berkas cloud warta, serta subdomain jemaat akan dihapus tanpa bisa dikembalikan.
                </p>
                
                <div className="mt-4">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                    Ketik kata kunci pengesahan di bawah:
                  </label>
                  <p className="text-[11px] bg-muted p-2 text-muted-foreground font-mono rounded border border-dashed mb-2 select-all">
                    HAPUS PERMANEN {selectedChurch?.namaGereja.toUpperCase()}
                  </p>
                  <Input 
                    placeholder="Masukkan teks konfirmasi..." 
                    value={deleteConfirmText}
                    onChange={(e) => {
                      setDeleteConfirmText(e.target.value)
                      setDeleteError(false)
                    }}
                    className={`h-9 text-xs rounded-lg bg-background text-foreground ${deleteError ? "border-destructive focus-visible:ring-destructive" : "border-border"}`}
                  />
                  {deleteError && (
                    <p className="text-[10px] text-destructive font-medium mt-1">?? Kalimat verifikasi tidak cocok dengan instruksi pengunci.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <button onClick={() => setDeleteModalOpen(false)} className="rounded-lg text-xs gap-1 h-8 border border-border bg-background text-foreground shadow-sm hover:bg-muted">
                Batalkan
              </button>
              <button onClick={handleExecuteDeleteChurch} className="rounded-lg text-xs gap-1 h-8 bg-red-600 hover:bg-red-700 text-white shadow-sm">
                Mutilasi Data Permanen
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}