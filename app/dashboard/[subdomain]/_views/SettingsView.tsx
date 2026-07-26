"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "../../../context/AuthContext"
import { ShieldAlert, Save, HelpCircle, HardDrive, ToggleLeft, ToggleRight } from "lucide-react"
import api from "@/lib/api" // 🚀 Menggunakan instance Axios pusat

export default function SettingsView() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth() as any
  const dashboardId = params?.id

  const [namaGereja, setNamaGereja] = useState(user?.namaGereja || "")
  const [namaAdmin, setNamaAdmin] = useState(user?.namaAdmin || "")
  const [maxUploadSize, setMaxUploadSize] = useState("10")
  const [autoCompress, setAutoCompress] = useState(true)
  const [saving, setSaving] = useState(false)

  // Ambil data profil terbaru dari server saat halaman diakses
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me")
        if (res.data) {
          if (res.data.namaGereja) setNamaGereja(res.data.namaGereja)
          if (res.data.namaAdmin) setNamaAdmin(res.data.namaAdmin)
        }
      } catch (err) {
        console.error("Gagal sinkronisasi profil:", err)
      }
    }
    fetchProfile()
  }, [])

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      // 🚀 Menggunakan instance Axios agar token otomatis terlampir di interceptor
      const res = await api.put("/auth/tenant/update-profile", {
        namaGereja,
        namaAdmin,
        maxUploadSize,
        autoCompress
      })

      if (res.status === 200 || res.status === 201) {
        alert("Konfigurasi instansi dan pengaturan file berhasil diperbarui!")
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memperbarui konfigurasi profil.")
    } finally {
      setSaving(false)
    }
  }

  const handleRequestDelete = () => {
    if (!confirm("Apakah Anda benar-benar ingin mengajukan penutupan akun?\nTindakan ini akan mengirim tiket pembatalan resmi ke Master Admin.")) return
    alert("Tiket pengajuan berhasil dibuat. Tim legal kami akan menghubungi Anda via email dalam 1x24 jam.")
  }

  return (
    <div className="w-full space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Hub Instansi</h1>
        <p className="text-sm text-gray-500">Konfigurasi parameter operasional dan manajemen berkas pada alamat <span className="text-blue-600 font-mono">/dashboard/{dashboardId}/settings</span></p>
      </div>

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: FORM CONFIG PROFILE & FILE MANAGEMENT */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border border-gray-200 bg-white rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Data Profil & Identitas Instansi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nama Instansi Gereja</label>
                <Input value={namaGereja} onChange={(e) => setNamaGereja(e.target.value)} required className="rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nama Kepala Administrator (Sub Owner)</label>
                <Input value={namaAdmin} onChange={(e) => setNamaAdmin(e.target.value)} required className="rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Alamat Email Utama (Kunci Akses)</label>
                <Input value={user?.email} disabled className="bg-gray-50 rounded-lg text-sm font-mono text-gray-400 cursor-not-allowed" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-gray-200 bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center gap-2">
              <HardDrive className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className="text-base font-semibold">Konfigurasi Berkas & Penyimpanan</CardTitle>
                <CardDescription className="text-xs">Atur batasan unggah dokumen khotbah, multimedia warta, dan dokumen jemaat.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Batas Maksimal Ukuran File Per Unggah (MB)</label>
                <Input type="number" value={maxUploadSize} onChange={(e) => setMaxUploadSize(e.target.value)} min="1" max="100" required className="rounded-lg text-sm" />
                <p className="text-[11px] text-gray-400 mt-1">Disarankan maksimal 20MB demi efisiensi kuota penyimpanan cloud database Anda.</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-700">Kompresi Gambar Otomatis</p>
                  <p className="text-[10px] text-gray-400">Mengecilkan ukuran resolusi foto jemaat/warta saat diunggah untuk menghemat storage.</p>
                </div>
                <button type="button" onClick={() => setAutoCompress(!autoCompress)} className="text-blue-600 focus:outline-none">
                  {autoCompress ? <ToggleRight className="h-9 w-9" /> : <ToggleLeft className="h-9 w-9 text-gray-300" />}
                </button>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={saving} className="rounded-lg text-xs gap-1.5 bg-blue-600 text-white px-4 h-10 shadow-sm">
            <Save className="h-4 w-4" /> {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
          </Button>
        </div>

        {/* KOLOM KANAN: DANGER ZONE & SUPPORT */}
        <div className="space-y-4">
          <Card className="shadow-sm border border-gray-200 bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base font-semibold">Bantuan Layanan</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-gray-500 leading-relaxed">
              Mengalami kendala alokasi penyimpanan file atau kuota penuh? Silakan ajukan upgrade paket atau hubungi tim teknis pusat di <a href="mailto:support@gerejapintar.id" className="text-blue-600 underline font-medium">support@gerejapintar.id</a>.
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/20 shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              <div>
                <CardTitle className="text-sm font-bold text-red-900">Danger Zone</CardTitle>
                <CardDescription className="text-[11px] text-red-700">Penutupan Kontrol Sistem Hub</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button type="button" variant="destructive" className="w-full rounded-lg text-xs bg-red-600 text-white h-9 shadow-sm" onClick={handleRequestDelete}>
                Ajukan Hapus Akun Hub
              </Button>
            </CardContent>
          </Card>
        </div>

      </form>
    </div>
  )
}