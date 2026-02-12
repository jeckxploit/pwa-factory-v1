import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Shield, Smartphone, Zap, User, Upload, Trash2, FileText, Loader2, Plus, ArrowUpRight, Activity } from 'lucide-react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../services/supabase'
import { getPosts, deletePost } from '../services/postService'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<any[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

  useEffect(() => {
    if (user) fetchPosts()
  }, [user])

  const fetchPosts = async () => {
    setIsLoadingPosts(true)
    try {
      const data = await getPosts(user!.id)
      setPosts(data || [])
    } catch (error: any) {
      toast.error('Gagal memuat data')
    } finally {
      setIsLoadingPosts(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    const loadingToast = toast.loading('Deleting...')
    try {
      await deletePost(id, user!.id)
      setPosts(posts.filter(p => p.id !== id))
      toast.success('Deleted successfully', { id: loadingToast })
    } catch (error) {
      toast.error('Failed to delete', { id: loadingToast })
    }
  }

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
            <Activity size={12} /> System Online
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
            Control <span className="text-zinc-700">Center</span>
          </h1>
        </div>
        <Button onClick={() => navigate('/create')} className="h-14 px-8 rounded-2xl flex items-center gap-2 group">
          <Plus size={20} /> 
          <span>NEW PRODUCTION</span>
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Apps', value: posts.length, icon: Smartphone, color: 'text-white' },
          { label: 'System Health', value: '99.9%', icon: Shield, color: 'text-green-500' },
          { label: 'Engine Speed', value: '1.2s', icon: Zap, color: 'text-yellow-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] hover:border-zinc-700 transition-all"
          >
            <stat.icon className={`${stat.color} mb-6`} size={24} />
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Feed List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText size={20} className="text-zinc-500" /> Recent Activity
            </h2>
            <button onClick={fetchPosts} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
              Refresh
            </button>
          </div>

          {isLoadingPosts ? (
            <div className="h-64 flex flex-col items-center justify-center bg-zinc-900/30 border border-zinc-800 border-dashed rounded-[2.5rem]">
              <Loader2 className="animate-spin text-zinc-700 mb-4" size={32} />
              <p className="text-xs text-zinc-600 uppercase tracking-widest">Syncing Database...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center bg-zinc-900/30 border border-zinc-800 border-dashed rounded-[2.5rem] text-center p-8">
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">No Production Data</p>
              <p className="text-zinc-700 text-sm max-w-xs">Mulai bangun aplikasi pertama Anda dengan menekan tombol New Production.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-zinc-900 border border-zinc-800 p-6 rounded-[1.5rem] flex items-center justify-between group hover:border-zinc-500 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight mb-1">{post.title}</h3>
                        <p className="text-zinc-500 text-sm line-clamp-1 max-w-md">{post.content}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 p-8 rounded-[2.5rem] border border-zinc-800 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
            <h3 className="text-xl font-bold mb-4">Pro Tips</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Gunakan fitur PWA untuk menginstal aplikasi ini langsung di layar utama ponsel Anda.
            </p>
            <Button variant="secondary" className="w-full rounded-xl py-3 text-xs font-bold uppercase tracking-widest">
              Learn More
            </Button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem]">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <User size={16} className="text-zinc-500" /> Account
            </h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold truncate">{user?.email?.split('@')[0]}</p>
                <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={async () => {
                await supabase.auth.signOut()
                navigate('/login')
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-red-500 hover:bg-red-500/5 rounded-xl transition-all border border-transparent hover:border-red-500/20"
            >
              <LogOut size={14} /> LOGOUT SYSTEM
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}