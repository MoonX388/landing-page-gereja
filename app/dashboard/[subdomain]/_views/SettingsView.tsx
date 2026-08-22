"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "../../../context/AuthContext"
import { ShieldAlert, Save, HelpCircle, HardDrive, ToggleLeft, ToggleRight, ArrowRightLeft, FileText, Upload, Globe, FileEdit, UserPlus } from "lucide-react"
import api from "@/lib/api"

export default function SettingsView() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth() as any
  const dashboardId = params?.id

  // State untuk form profil
  const [namaGereja, setNamaGereja] = useState(user?.namaGereja || "")
  const [namaAdmin, setNamaAdmin] = useState(user?.namaAdmin || "")
  const [username, setUsername] = useState(user?.username || "")
  const [noHpAdmin, setNoHpAdmin] = useState(user?.noHpAdmin || "")
  const [alamat, setAlamat] = useState(user?.alamat || "")
  const [kota, setKota] = useState(user?.kota || "")
  const [provinsi, setProvinsi] = useState(user?.provinsi || "")
  const [deskripsi, setDeskripsi] = useState(user?.deskripsi || "")
  const [maxUploadSize, setMaxUploadSize] = useState("10")
  const [autoCompress, setAutoCompress] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // State untuk berita jemaat custom
  const [newsTitle, setNewsTitle] = useState("")
  const [newsContent, setNewsContent] = useState("")
  const [newsCategory, setNewsCategory] = useState("")
  const [uploadingNews, setUploadingNews] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // State untuk form transfer kepemilikan
  const [transferTarget, setTransferTarget] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me")
        if (res.data) {
          if (res.data.namaGereja) setNamaGereja(res.data.namaGereja)
          if (res.data.namaAdmin) setNamaAdmin(res.data.namaAdmin)
          if (res.data.username) setUsername(res.data.username)
          if (res.data.noHpAdmin) setNoHpAdmin(res.data.noHpAdmin)
          if (res.data.alamat) setAlamat(res.data.alamat)
          if (res.data.kota) setKota(res.data.kota)
          if (res.data.provinsi) setProvinsi(res.data.provinsi)
          if (res.data.deskripsi) setDeskripsi(res.data.deskripsi)
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
      const res = await api.put("/auth/tenant/update-profile", {
        namaGereja,
        namaAdmin,
        username,
        noHpAdmin,
        alamat,
        kota,
        provinsi,
        deskripsi,
        maxUploadSize,
        autoCompress
      })

      if (res.status === 200 || res.status === 201) {
        alert("Konfigurasi instansi dan pengaturan berhasil diperbarui!")
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

  // 🚀 Fitur Baru: Transfer Kepemilikan
  const handleTransferOwnership = async () => {
    if (!transferTarget) {
      alert("Harap masukkan email tujuan transfer.")
      return
    }
    
    if (!confirm(`PENTING: Anda akan memindahkan HAK MILIK gereja ini ke akun "${transferTarget}".\nAnda akan kehilangan akses admin utama setelah transfer selesai.\nLanjutkan?`)) return
    
    setIsTransferring(true)
    try {
      const res = await api.post("/auth/tenant/transfer-ownership", {
        targetEmail: transferTarget
      })
      alert("Permintaan transfer berhasil. Email instruksi telah dikirim ke target akun.")
      setTransferTarget("")
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal melakukan transfer kepemilikan.")
    } finally {
      setIsTransferring(false)
    }
  }

  const handleUploadNews = async () => {
    if (!newsTitle || !newsContent) {
      alert("Harap isi judul dan konten berita.")
      return
    }
    
    setUploadingNews(true)
    try {
      const formData = new FormData()
      formData.append("title", newsTitle)
      formData.append("content", newsContent)
      formData.append("category", newsCategory || "Umum")
      
      if (uploadedFile) {
        formData.append("file", uploadedFile)
      }
      
      const res = await api.post("/auth/tenant/upload-news", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      
      if (res.status === 200 || res.status === 201) {
        alert("Berita jemaat berhasil diunggah!")
        setNewsTitle("")
        setNewsContent("")
        setNewsCategory("")
        setUploadedFile(null)
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengunggah berita jemaat.")
    } finally {
      setUploadingNews(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Auto-fill title from filename if title is empty
      if (!newsTitle) {
        const fileName = file.name.replace(/\.[^/.]+$/, "")
        setNewsTitle(fileName)
      }
    }
  }

  const handleExtractFromDocument = async () => {
    if (!uploadedFile) {
      alert("Harap upload dokumen terlebih dahulu.")
      return
    }
    
    setUploadingNews(true)
    try {
      const formData = new FormData()
      formData.append("file", uploadedFile)
      
      const res = await api.post("/auth/tenant/extract-document", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      
      if (res.data?.content) {
        setNewsContent(res.data.content)
        alert("Konten berhasil diekstrak dari dokumen!")
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal mengekstrak konten dari dokumen.")
    } finally {
      setUploadingNews(false)
    }
  }

  return (
    <div className="w-full space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Hub Instansi</h1>
        <p className="text-sm text-gray-500">Konfigurasi parameter operasional dan manajemen berkas pada alamat <span className="text-blue-600 font-mono">/dashboard/{dashboardId}/settings</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: FORM CONFIG PROFILE & FILE MANAGEMENT */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveSettings}>
            <Card className="shadow-sm border border-gray-200 bg-white rounded-xl mb-6">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Data Profil & Identitas Instansi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nama Instansi Gereja</label>
                  <Input value={namaGereja} onChange={(e) => setNamaGereja(e.target.value)} required className="rounded-lg text-sm" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nama Kepala Administrator</label>
                    <Input value={namaAdmin} onChange={(e) => setNamaAdmin(e.target.value)} required className="rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">No. HP Admin</label>
                    <Input type="tel" value={noHpAdmin} onChange={(e) => setNoHpAdmin(e.target.value)} placeholder="08..." required className="rounded-lg text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nama Pengguna (Username)</label>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} required className="rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Alamat Email Utama</label>
                    <Input value={user?.email} disabled className="bg-gray-50 rounded-lg text-sm font-mono text-gray-400 cursor-not-allowed" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Alamat Lengkap</label>
                  <Input value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Jalan, No. Rumah, RT/RW" className="rounded-lg text-sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Kota/Kabupaten</label>
                    <Input value={kota} onChange={(e) => setKota(e.target.value)} placeholder="Nama kota" className="rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Provinsi</label>
                    <Input value={provinsi} onChange={(e) => setProvinsi(e.target.value)} placeholder="Nama provinsi" className="rounded-lg text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Deskripsi Gereja</label>
                  <textarea 
                    value={deskripsi} 
                    onChange={(e) => setDeskripsi(e.target.value)} 
                    placeholder="Deskripsi singkat tentang gereja..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border border-gray-200 bg-white rounded-xl mb-6">
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

            <Card className="shadow-sm border border-gray-200 bg-white rounded-xl mb-6">
              <CardHeader className="flex flex-row items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <CardTitle className="text-base font-semibold">Unggah Berita Jemaat Custom</CardTitle>
                  <CardDescription className="text-xs">Buat dan publikasikan berita/pengumuman untuk jemaat gereja.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Upload Dokumen (DOCX/PDF)</label>
                  <div className="mt-1">
                    <input
                      type="file"
                      accept=".docx,.doc,.pdf"
                      onChange={handleFileUpload}
                      className="w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {uploadedFile && (
                      <p className="mt-1 text-xs text-green-600">✓ {uploadedFile.name}</p>
                    )}
                  </div>
                </div>

                {uploadedFile && (
                  <Button
                    type="button"
                    onClick={handleExtractFromDocument}
                    disabled={uploadingNews}
                    className="w-full rounded-lg text-xs gap-1.5 bg-purple-600 text-white h-9 shadow-sm hover:bg-purple-700"
                  >
                    <FileText className="h-4 w-4" /> {uploadingNews ? "Mengekstrak..." : "Ekstrak Konten dari Dokumen"}
                  </Button>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Judul Berita</label>
                  <Input 
                    value={newsTitle} 
                    onChange={(e) => setNewsTitle(e.target.value)} 
                    placeholder="Masukkan judul berita..."
                    className="rounded-lg text-sm" 
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Kategori</label>
                  <Input 
                    value={newsCategory} 
                    onChange={(e) => setNewsCategory(e.target.value)} 
                    placeholder="Contoh: Ibadah, Pengumuman, Acara"
                    className="rounded-lg text-sm" 
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Konten Berita</label>
                  <textarea 
                    value={newsContent} 
                    onChange={(e) => setNewsContent(e.target.value)} 
                    placeholder="Tulis konten berita di sini atau ekstrak dari dokumen..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button 
                  type="button"
                  onClick={handleUploadNews}
                  disabled={uploadingNews}
                  className="mt-4 rounded-lg text-xs gap-1.5 bg-green-600 text-white px-4 h-10 shadow-sm hover:bg-green-700"
                >
                  <Upload className="h-4 w-4" /> {uploadingNews ? "Mengunggah..." : "Unggah Berita"}
                </Button>
              </CardContent>
            </Card>

            <Button type="submit" disabled={saving} className="rounded-lg text-xs gap-1.5 bg-blue-600 text-white px-4 h-10 shadow-sm">
              <Save className="h-4 w-4" /> {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
            </Button>
          </form>
        </div>

        {/* KOLOM KANAN: TRANSFER & DANGER ZONE & SUPPORT */}
        <div className="space-y-4">
          <Card className="shadow-sm border border-gray-200 bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base font-semibold">Bantuan Layanan</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-gray-500 leading-relaxed">
              Mengalami kendala alokasi penyimpanan file atau kuota penuh? Silakan ajukan upgrade paket atau hubungi tim teknis pusat di <a href="mailto:support@gerejapintar.id" className="text-blue-600 underline font-medium">support@gerejapintar.id</a>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-gray-200 bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base font-semibold">Aktifkan Web</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                type="button"
                className="w-full rounded-lg text-xs bg-blue-600 hover:bg-blue-700 text-white h-9 shadow-sm"
              >
                Aktifkan Website Gereja
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-gray-200 bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center gap-2">
              <FileEdit className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base font-semibold">Form</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                type="button"
                className="w-full rounded-lg text-xs bg-blue-600 hover:bg-blue-700 text-white h-9 shadow-sm"
              >
                Kelola Form
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-gray-200 bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base font-semibold">Tambah User</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                type="button"
                className="w-full rounded-lg text-xs bg-blue-600 hover:bg-blue-700 text-white h-9 shadow-sm"
              >
                Tambah User Baru
              </Button>
            </CardContent>
          </Card>

          {/* 🚀 Fitur Baru: Transfer Kepemilikan */}
          <Card className="border-orange-200 bg-orange-50/30 shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-orange-600" />
              <div>
                <CardTitle className="text-sm font-bold text-orange-900">Transfer Kepemilikan</CardTitle>
                <CardDescription className="text-[11px] text-orange-700">Pindahkan hak akses Admin Utama ke akun lain</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input 
                type="email" 
                placeholder="Masukkan email target..." 
                value={transferTarget}
                onChange={(e) => setTransferTarget(e.target.value)}
                className="rounded-lg text-xs h-9 bg-white" 
              />
              <Button 
                type="button" 
                disabled={isTransferring}
                className="w-full rounded-lg text-xs bg-orange-600 hover:bg-orange-700 text-white h-9 shadow-sm" 
                onClick={handleTransferOwnership}
              >
                {isTransferring ? "Memproses..." : "Transfer Akun Gereja"}
              </Button>
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
      </div>
    </div>
  )
}