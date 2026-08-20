import { notFound } from "next/navigation"
import { StatusCodePage } from "@/components/status-code-page"

const statusMessages: Record<number, { title: string; description: string }> = {
  200: { title: "Berhasil", description: "Permintaan berhasil diproses." },
  201: { title: "Berhasil Dibuat", description: "Data baru berhasil dibuat." },
  202: { title: "Sedang Diproses", description: "Permintaan diterima dan sedang diproses." },
  204: { title: "Tidak Ada Konten", description: "Permintaan berhasil, tetapi tidak ada data untuk ditampilkan." },
  301: { title: "Dipindahkan Permanen", description: "Halaman telah dipindahkan ke alamat baru." },
  302: { title: "Dialihkan", description: "Anda sedang dialihkan ke halaman yang sesuai." },
  304: { title: "Tidak Berubah", description: "Tidak ada perubahan pada data yang diminta." },
  400: { title: "Permintaan Tidak Valid", description: "Data yang dikirim tidak dapat diproses." },
  401: { title: "Belum Terautentikasi", description: "Silakan masuk terlebih dahulu untuk melanjutkan." },
  403: { title: "Akses Ditolak", description: "Anda tidak memiliki izin untuk mengakses halaman ini." },
  404: { title: "Halaman Tidak Ditemukan", description: "Alamat yang Anda buka tidak tersedia atau sudah dipindahkan." },
  408: { title: "Permintaan Kedaluwarsa", description: "Server terlalu lama menunggu permintaan selesai." },
  409: { title: "Terjadi Konflik", description: "Permintaan bertentangan dengan data yang sudah ada." },
  422: { title: "Data Tidak Dapat Diproses", description: "Data valid secara format, tetapi tidak dapat diproses." },
  429: { title: "Terlalu Banyak Permintaan", description: "Tunggu sebentar sebelum mencoba lagi." },
  500: { title: "Kesalahan Server", description: "Terjadi gangguan internal. Tim kami sedang menanganinya." },
}

function getStatusMessage(code: number) {
  if (statusMessages[code]) return statusMessages[code]
  if (code >= 200 && code < 300) return { title: "Permintaan Berhasil", description: "Permintaan berhasil diproses oleh server." }
  if (code >= 300 && code < 400) return { title: "Pengalihan", description: "Permintaan membutuhkan pengalihan ke alamat lain." }
  if (code >= 400 && code < 500) return { title: "Kesalahan Permintaan", description: "Server tidak dapat memproses permintaan ini." }
  return { title: "Kesalahan Server", description: "Server mengalami gangguan saat memproses permintaan." }
}

export default async function StatusRoutePage({ params }: { params: Promise<{ code: string }> }) {
  const { code: codeParam } = await params
  const code = Number(codeParam)

  if (!Number.isInteger(code) || code < 200 || code > 500) notFound()

  const message = getStatusMessage(code)
  return <StatusCodePage code={code} title={message.title} description={message.description} />
}
