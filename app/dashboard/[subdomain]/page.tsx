"use client"

import { useParams } from "next/navigation"
import { useAuth } from "../../context/AuthContext"
import OverviewView from "./_views/OverviewView"

export default function ChurchDashboardPage() {
  const params = useParams()
  const { user } = useAuth()
  
  // 🚀 PERBAIKAN: Ambil berdasarkan key .subdomain
  const churchSubdomain = params?.subdomain || "default"

  return <OverviewView user={user} dashboardId={churchSubdomain} />
}