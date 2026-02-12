import { useAuth } from "../../hooks/useAuth"
import Sidebar from "./Sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Sidebar />
      <div className="lg:ml-72 min-h-screen transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  )
}