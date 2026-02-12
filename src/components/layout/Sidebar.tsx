import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Bell, FileText, Home, Menu, Settings, Users, X, PlusCircle, Smartphone } from 'lucide-react'
import { useAppStore } from '../../store/useStore'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAppStore()
  const location = useLocation()

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { x: -300, opacity: 0 }
  }

  const menuItems = [
    { icon: Home, label: 'Overview', href: '/dashboard' },
    { icon: PlusCircle, label: 'New Production', href: '/create' },
    { icon: Smartphone, label: 'My Projects', href: '/projects' },
    { icon: BarChart3, label: 'Analytics', href: '#' },
    { icon: Users, label: 'Team', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl lg:hidden hover:bg-zinc-800 transition-all"
      >
        <Menu size={20} className="text-white" />
      </button>

      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Overlay for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed left-0 top-0 h-full w-72 bg-zinc-950 border-r border-zinc-900 z-50 flex flex-col"
            >
              <div className="p-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-black rounded-sm" />
                  </div>
                  <span className="font-black tracking-tighter text-xl uppercase italic">JECK.</span>
                </div>
                <button onClick={toggleSidebar} className="lg:hidden p-1 hover:bg-zinc-900 rounded-lg">
                  <X size={20} className="text-zinc-500" />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-1.5">
                <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                        isActive 
                          ? 'bg-white text-black font-bold' 
                          : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-black' : 'text-zinc-500 group-hover:text-white'} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="p-6 border-t border-zinc-900">
                <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Production Slot</p>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white">2 / 30 Apps</span>
                    <span className="text-zinc-500">7%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-[7%]" />
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}