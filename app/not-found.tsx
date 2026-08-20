import { StatusCodePage } from "@/components/status-code-page"

export default function NotFound() {
  return (
    <StatusCodePage
      code={404}
      title="Halaman Tidak Ditemukan"
      description="Alamat yang Anda buka tidak tersedia atau sudah dipindahkan."
    />
  )
}
