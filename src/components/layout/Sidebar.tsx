import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Home, Settings, PlusCircle, Smartphone, Cpu, ClipboardList, LogOut } from 'lucide-react'
import { useAppStore } from '../../store/useStore'
import { useAuth } from '../../hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAppStore()
  const { signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    toast.success('Logged out')
    navigate('/login')
  }

  const menuItems = [
    { icon: Home, label: 'Overview', href: '/dashboard' },
    { icon: ClipboardList, label: 'Habit forge', href: '/habit' },
    { icon: PlusCircle, label: 'Production', href: '/create' },
    { icon: Smartphone, label: 'Projects', href: '/projects' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <>
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40 lg:hidden"
            />

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 h-full w-[280px] sm:w-80 glass-panel border-r border-white/5 z-50 flex flex-col"
            >
              <div className="p-12 pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Cpu size={24} className="text-black relative z-10" />
                  </div>
                  <div>
                    <span className="block font-black tracking-tighter text-2xl uppercase italic leading-none">JECK.</span>
                    <span className="text-[9px] font-black text-emerald-500/50 uppercase tracking-[0.4em]">Matrix v2.4</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <nav className="flex-1 px-8 space-y-1.5 overflow-y-auto py-8">
                <p className="px-5 text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-8 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                  Core Subsystems
                </p>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                      className={`relative flex items-center gap-5 px-6 py-4.5 rounded-[1.5rem] transition-all group ${isActive ? 'text-black' : 'text-zinc-500 hover:text-white'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-white shadow-[0_15px_30px_rgba(255,255,255,0.1)]"
                          style={{ borderRadius: '1.25rem' }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon size={18} className={`relative z-10 ${isActive ? 'text-black' : 'text-zinc-500 group-hover:text-white transition-colors'}`} />
                      <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.1em]">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="p-8 pb-10 space-y-5">
                <div className="bg-white/[0.02] rounded-[1.5rem] p-5 border border-white/5 group hover:border-emerald-500/20 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest group-hover:text-emerald-500/50 transition-colors">Quantum Link</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(idx => (
                        <motion.div
                          key={idx}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ delay: idx * 0.2, duration: 2, repeat: Infinity }}
                          className={`w-[1px] h-2.5 rounded-full ${idx < 4 ? 'bg-emerald-500' : 'bg-zinc-800'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-[8px] font-black uppercase italic text-zinc-500 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                    Protocol: ID-SBY-04
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-zinc-600 hover:text-rose-500 hover:bg-rose-500/5 transition-all group border border-transparent hover:border-rose-500/10"
                >
                  <LogOut size={14} className="group-hover:translate-x-1 transition-transform" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">Logout Authority</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}