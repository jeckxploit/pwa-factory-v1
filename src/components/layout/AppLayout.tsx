import { useAuth } from "../../hooks/useAuth"
import Sidebar from "./Sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Sidebar />
      <div className="transition-all duration-300">
        {children}
      </div>
    </div>
  )
}