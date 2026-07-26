// app/dashboard/[id]/_views/DomainsView.tsx
"use client"

import { Globe, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DomainsView() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Domain</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola domain kustom untuk website gereja Anda.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Tambah Domain
        </Button>
      </div>

      <Card className="shadow-sm border border-gray-200 dark:border-gray-700 w-full">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Daftar Domain Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-sm">gerejapintar.id</p>
                <p className="text-xs text-green-600 font-medium">Connected (Vercel)</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">Utama</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}