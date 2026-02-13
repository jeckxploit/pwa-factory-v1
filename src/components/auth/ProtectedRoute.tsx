import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../services/supabase"
import type { Session } from "@supabase/supabase-js"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    getSession()
  }, [])

  if (loading) return <div className="p-6 text-zinc-500 uppercase font-black italic">Authenticating...</div>

  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}