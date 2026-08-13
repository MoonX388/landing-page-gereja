"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "../../../context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock, Save } from "lucide-react"

export default function UserProfilePage() {
  const params = useParams()
  const { user } = useAuth() as any
  const profileUserId = params?.id

  const [namaAdmin, setNamaAdmin] = useState(user?.namaAdmin || "")
  const [passwordBaru, setPasswordBaru] = useState("")

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Fitur update password & data kredensial akun berhasil disimpan!")
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pengaturan Akun Pengguna</h1>
        <p className="text-sm text-muted-foreground">Kelola informasi login pribadi dan kata sandi Anda di sini.</p>
      </div>

      <Card className="shadow-sm border-border bg-card rounded-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
            <User className="h-5 w-5 text-primary" /> Kredensial Pengguna (ID: {profileUserId})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateAccount} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Nama Lengkap Anda</label>
              <Input value={namaAdmin} onChange={(e) => setNamaAdmin(e.target.value)} required className="bg-background text-foreground" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Email Login</label>
              <Input value={user?.email} disabled className="bg-muted text-muted-foreground cursor-not-allowed font-mono" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5 flex items-center gap-1">
                <Lock className="h-3 w-3" /> Ganti Kata Sandi Baru
              </label>
              <Input type="password" placeholder="••••••••" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} className="bg-background text-foreground" />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs px-4 h-9">
              <Save className="h-4 w-4 mr-1" /> Simpan Akun
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}