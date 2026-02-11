import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Bell, FileText, Home, Menu, Settings, Users, X } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const sidebarVariants = {
    hidden: {
      x: -300,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        stiffness: 100,
        damping: 20,
      } as any,
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: FileText, label: 'Projects', href: '/projects' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition"
      >
        <Menu size={24} className="text-white" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 z-40 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-white">JECK</h2>
                <p className="text-xs text-zinc-500 mt-1">Navigation Panel</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-zinc-800 rounded transition"
              >
                <X size={20} className="text-zinc-400" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.li
                      key={item.label}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 group"
                      >
                        <Icon
                          size={20}
                          className="text-zinc-500 group-hover:text-white transition"
                        />
                        <span className="font-medium text-sm">{item.label}</span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800 bg-zinc-950">
              <div className="text-xs text-zinc-500 text-center">
                <p>© 2026 JECK</p>
                <p className="mt-1">Build with ❤️</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
