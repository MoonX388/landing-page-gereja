// app/dashboard/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { useAuth } from "../../context/AuthContext"
import OverviewView from "./_views/OverviewView"

export default function ChurchDashboardPage() {
  const params = useParams()
  const { user } = useAuth()
  const dashboardId = params?.id || "default"

  return <OverviewView user={user} dashboardId={dashboardId} />
}