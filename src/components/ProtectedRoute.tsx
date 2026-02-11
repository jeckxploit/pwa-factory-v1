import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="p-10">Loading...</div>

  if (!session) return <Navigate to="/" />

  return children
}