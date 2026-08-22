import { StatusCodePage } from "@/components/status-code-page"

export default function NotFound() {
  return (
    <StatusCodePage
      code={404}
      title="Fitur Ini Sedang Dalam Pengembangan"
      description="Alamat yang Anda buka sedang dikembangkan oleh penyedia halaman."
    />
  )
}
