"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Church, Globe, ShieldAlert, ArrowRight, Ban, CheckCircle, Trash2 } from "lucide-react"
import ConfirmationModal from "./components/ConfirmationModal"
import api from "@/lib/api" // 🚀 IMPORT INSTANCE AXIOS PUSAT DI SINI

export default function MasterDashboardPage() {
  const router = useRouter()
  const [churches, setChurches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // State untuk Kontrol Klien yang Sedang Dipilih
  const [selectedChurch, setSelectedChurch] = useState<{ id: number; namaGereja: string; isSuspended?: boolean } | null>(null)
  
  // State untuk Menyalakan/Mematikan Popup Modal Konfirmasi
  const [banModalOpen, setBanModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  
  // Input teks konfirmasi manual khusus untuk aksi hapus kritis
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [deleteError, setDeleteError] = useState(false)

  // 🔄 Ambil Data Menggunakan Axios Instance
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

  // 🛡️ Pemicu Awal Modal Banned
  const triggerBanModal = (id: number, namaGereja: string, isSuspended: boolean) => {
    setSelectedChurch({ id, namaGereja, isSuspended })
    setBanModalOpen(true)
  }

  // 🛡️ EKSEKUSI: Mengubah Status Ban/Suspend Klien via Axios Patch
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

  // 🛑 Pemicu Awal Modal Hapus Akun
  const triggerDeleteModal = (id: number, namaGereja: string) => {
    setSelectedChurch({ id, namaGereja })
    setDeleteConfirmText("")
    setDeleteError(false)
    setDeleteModalOpen(true)
  }

  // 🛑 EKSEKUSI Kritis: Menghapus Cabang Penyewa via Axios Delete
  const handleExecuteDeleteChurch = async () => {
    if (!selectedChurch) return

    // Validasi string pengaman manual sebelum menghapus data
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Master Pusat Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Panel kendali global platform SaaS GerejaPintar.</p>
      </div>

      {/* METRIK STATISTIK SINGKAT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Mitra Gereja</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{loading ? "..." : `${churches.length} Gereja`}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Church className="h-6 w-6" /></div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Subdomain Aktif</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{loading ? "..." : `${churches.filter(c => c.subdomain && !c.isSuspended).length} Live`}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Globe className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Akun Banned / Suspend</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{loading ? "..." : `${churches.filter(c => c.isSuspended).length} Akun`}</p>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-lg"><Ban className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Menunggu Review</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{loading ? "..." : `${churches.filter(c => !c.isVerified).length} Request`}</p>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><ShieldAlert className="h-6 w-6" /></div>
        </div>
      </div>

      {/* TABEL MANAJEMEN KLIEN UTAMA */}
      <Card className="shadow-sm border border-gray-200 dark:border-gray-700 w-full bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Manajemen Klien & Penegakan Kebijakan Akun</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-sm text-gray-500 text-center py-6">Sinkronisasi data tabel pusat...</p>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-medium bg-gray-50/50">
                  <th className="py-3 px-3">Nama Gereja</th>
                  <th className="py-3 px-3">Administrator</th>
                  <th className="py-3 px-3">Domain Pemetaan</th>
                  <th className="py-3 px-3">Status Sistem</th>
                  <th className="py-3 px-3 text-center">Tindakan Otoritas Super Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {churches.map((gereja) => (
                  <tr key={gereja.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-3 font-medium text-gray-900">{gereja.namaGereja}</td>
                    <td className="py-3.5 px-3 text-gray-500">
                      <div>{gereja.namaAdmin}</div>
                      <div className="text-xs text-gray-400 font-mono">{gereja.email}</div>
                    </td>
                    <td className="py-3.5 px-3 text-blue-600 font-mono text-xs">
                      {gereja.subdomain ? `${gereja.subdomain}.gerejapintar.id` : "belum diatur"}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${gereja.isSuspended ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {gereja.isSuspended ? "Banned / Suspend" : "Aktif Normal"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 flex items-center justify-center gap-2">
                      {/* Tombol Navigasi Kelola Hub */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="rounded-lg text-xs gap-1 h-8 hover:bg-blue-50 hover:text-blue-600"
                        disabled={!gereja.subdomain || gereja.isSuspended}
                        onClick={() => router.push(`/dashboard/${gereja.subdomain}`)}
                      >
                        Kelola Hub <ArrowRight className="h-3 w-3" />
                      </Button>

                      {/* Tombol Aksi Banned */}
                      <Button 
                        variant={gereja.isSuspended ? "default" : "outline"}
                        size="sm"
                        className={`rounded-lg text-xs gap-1 h-8 ${gereja.isSuspended ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "text-amber-700 border-amber-200 hover:bg-amber-50"}`}
                        onClick={() => triggerBanModal(gereja.id, gereja.namaGereja, !!gereja.isSuspended)}
                      >
                        {gereja.isSuspended ? <CheckCircle className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                        {gereja.isSuspended ? "Lepas Ban" : "Banned"}
                      </Button>

                      {/* Tombol Hapus Akun */}
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="rounded-lg text-xs gap-1 h-8 bg-red-600 hover:bg-red-700"
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
          <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm" onClick={() => setDeleteModalOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-2xl border border-gray-100 font-sans animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-50">
                <ShieldAlert className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1 mt-1">
                <h3 className="text-base font-bold text-gray-900">Peringatan Kritis Super Admin</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  Tindakan ini akan memusnahkan database <strong className="text-red-600 font-bold">{selectedChurch?.namaGereja}</strong> secara mutlak. Seluruh data keuangan, berkas cloud warta, serta subdomain jemaat akan dihapus tanpa bisa dikembalikan.
                </p>
                
                <div className="mt-4">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Ketik kata kunci pengesahan di bawah:
                  </label>
                  <p className="text-[11px] bg-gray-50 p-2 text-gray-600 font-mono rounded border border-dashed mb-2 select-all">
                    HAPUS PERMANEN {selectedChurch?.namaGereja.toUpperCase()}
                  </p>
                  <Input 
                    placeholder="Masukkan teks konfirmasi..." 
                    value={deleteConfirmText}
                    onChange={(e) => {
                      setDeleteConfirmText(e.target.value)
                      setDeleteError(false)
                    }}
                    className={`h-9 text-xs rounded-lg ${deleteError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                  {deleteError && (
                    <p className="text-[10px] text-red-600 font-medium mt-1">⚠️ Kalimat verifikasi tidak cocok dengan instruksi pengunci.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <button onClick={() => setDeleteModalOpen(false)} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
                Batalkan
              </button>
              <button onClick={handleExecuteDeleteChurch} className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700">
                Mutilasi Data Permanen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}