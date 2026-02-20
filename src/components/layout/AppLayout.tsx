import { motion } from "framer-motion"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import { Menu } from "lucide-react"
import { useAppStore } from "../../store/useStore"
import { Logo } from "../ui/Logo"

export default function AppLayout() {
  const { toggleSidebar } = useAppStore()

  return (
    <div className="engine-container">
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-panel border-b border-white/5 z-[45] flex items-center justify-between px-6">
        <button
          onClick={toggleSidebar}
          className="p-2.5 glass-panel rounded-xl hover:border-white/20 active:scale-95 transition-all"
        >
          <Menu size={18} className="text-zinc-400" />
        </button>
        <div className="flex items-center gap-3">
          <span className="font-black tracking-tighter text-sm uppercase italic text-zinc-400">JECK.</span>
          <Logo size={32} />
        </div>
      </div>

      <Sidebar />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="lg:pl-80 min-h-screen transition-all duration-500 pt-16 lg:pt-0"
      >
        <div className="p-4 sm:p-6 lg:p-12 xl:p-20 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  )
}