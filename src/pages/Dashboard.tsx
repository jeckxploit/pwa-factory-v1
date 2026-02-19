import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, User, Trash2, Loader2, Plus, ArrowUpRight, Activity, Sparkles, Box } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { getPosts, deletePost } from '../services/postService'
import { getProfile } from '../services/profileService'
import type { Post } from '../types/post'
import type { Profile } from '../types/profile'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)

  const fetchPosts = useCallback(async () => {
    setIsLoadingPosts(true)
    try {
      const data = await getPosts(user!.id)
      setPosts(data || [])
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Sync Failed'
      console.error("[Dashboard] Sync Failed:", error)
      toast.error('Sync Failed: ' + message)
    } finally {
      setIsLoadingPosts(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchPosts()
      getProfile(user.id).then(setProfile)
    }
  }, [user, fetchPosts])

  const handleDeletePost = async (id: string) => {
    const loadingToast = toast.loading('Terminating...')
    try {
      await deletePost(id, user!.id)
      setPosts(posts.filter(p => p.id !== id))
      toast.success('Terminated', { id: loadingToast })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Action Failed'
      console.error("[Dashboard] Delete Failed:", error)
      toast.error('Action Failed: ' + message, { id: loadingToast })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 lg:px-12">
      {/* Header Area */}
      <header className="relative mb-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-16">
              <span className="w-8 h-[1px] bg-zinc-800" />
              <Activity size={12} className="text-emerald-500 animate-pulse" />
              Mainframe Operational Stage
            </div>
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black tracking-tighter leading-[0.85] mb-4">
              <span className="premium-gradient-text block">CORE</span>
              <span className="text-white/20">MODULE</span>
            </h1>
            <p className="text-zinc-500 text-xs font-medium max-w-sm tracking-tight opacity-80">
              Integrated development environment for next-generation <span className="text-zinc-400">PWA architectures</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Button
              onClick={() => navigate('/create')}
              size="lg"
              className="bg-zinc-100 text-black hover:bg-white px-8 py-6 rounded-full text-[10px] font-black tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.1)] group"
            >
              <Plus size={16} strokeWidth={3} className="mr-2" />
              INITIALIZE APP
              <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { label: 'Active Nodes', value: posts.length, icon: Box, glow: 'neon-glow-emerald' },
          { label: 'Security Level', value: 'Alpha-9', icon: Shield, glow: 'neon-glow-amber' },
          { label: 'System Load', value: '4.2%', icon: Zap, glow: 'neon-glow-violet' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className={`glass-card p-8 group ${stat.glow}`}
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={64} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 group-hover:border-white/20 transition-all">
                <stat.icon className="text-zinc-400 group-hover:text-white transition-colors" size={20} />
              </div>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black italic tracking-tighter uppercase">{stat.value}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Split Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between items-center mb-4">
            <h2 className="text-xl font-black tracking-tight uppercase italic flex items-center gap-3">
              <div className="w-1 h-6 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] rounded-full" />
              Operational Stack
            </h2>
            <button
              onClick={fetchPosts}
              className="px-4 py-2 text-[9px] font-black text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg border border-transparent hover:border-zinc-800 transition-all uppercase tracking-widest"
            >
              Sync Matrix
            </button>
          </div>

          {isLoadingPosts ? (
            <div className="h-80 glass-card border-dashed border-white/5 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-zinc-700 mb-6" size={40} />
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-bold">Synchronizing...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="h-80 glass-card border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 border border-zinc-900 flex items-center justify-center mb-8 shadow-inner">
                <Sparkles size={32} className="text-zinc-800" />
              </div>
              <h3 className="text-zinc-400 font-bold uppercase tracking-widest mb-3">Void Detected</h3>
              <p className="text-zinc-600 text-xs max-w-xs leading-relaxed mb-8">
                Your production line is currently inactive. Initiate the first sequence to begin.
              </p>
              <Button variant="outline" className="rounded-full px-8 text-[10px] hover:bg-white hover:text-black" onClick={() => navigate('/create')}>
                Initialize Launch
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="glass-card p-6 flex items-center justify-between group group/card hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-600 group-hover/card:text-emerald-400 group-hover/card:border-emerald-500/30 transition-all duration-500">
                        <Box size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg tracking-tight mb-0.5 uppercase italic">{post.title}</h3>
                        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-zinc-800" />
                          {post.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="p-3 text-zinc-700 hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-3 text-zinc-800 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover/card:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-10 rounded-[3rem] relative overflow-hidden group cursor-default"
          >
            <div className="absolute top-0 right-0 p-8 text-black/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white mb-8">
                <Box size={20} />
              </div>
              <h3 className="text-black text-2xl font-black mb-4 leading-none uppercase italic">PRO<br />BUILDER</h3>
              <p className="text-black/60 text-xs leading-loose mb-10 font-bold uppercase tracking-tight">
                Unlock high-performance architectures. Build, scale, and automate your <span className="text-black">PWA ecosystem</span> seamlessly.
              </p>
              <Button variant="secondary" className="w-full bg-black text-white hover:bg-zinc-800 rounded-full py-6 text-[10px] font-black tracking-widest border-none">
                ACCESS DOCS
              </Button>
            </div>
          </motion.div>

          <div className="glass-card p-10">
            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] mb-10 text-zinc-600 flex items-center gap-2">
              <User size={12} className="text-emerald-500" /> System Operator
            </h3>
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 font-black text-xl italic shadow-inner">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="font-black text-lg truncate uppercase italic tracking-tight mb-0.5">
                  {profile?.full_name || user?.email?.split('@')[0]}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[9px] text-zinc-600 truncate font-bold tracking-widest">{user?.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={async () => {
                await signOut()
                navigate('/login')
              }}
              className="w-full py-4 text-[9px] font-black text-zinc-600 hover:text-rose-500 hover:bg-rose-500/5 rounded-2xl transition-all border border-zinc-800/50 hover:border-rose-500/30 uppercase tracking-[0.3em]"
            >
              Terminate Authority
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}