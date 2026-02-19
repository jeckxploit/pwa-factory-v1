import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { motion } from 'framer-motion'
import { ArrowLeft, UserPlus, Sparkles } from 'lucide-react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      toast.error(error.message)
      setLoading(false)
    } else {
      toast.success('Cek email kamu untuk verifikasi!')
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-black">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 sm:top-8 sm:left-8 p-3 sm:p-4 glass-panel rounded-2xl hover:border-white/20 transition-all flex items-center gap-2 sm:gap-3 group z-50 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden xs:inline">BACK NAVIGATION</span>
        <span className="xs:hidden">BACK</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <form onSubmit={handleRegister} className="glass-card p-8 md:p-14 border-white/5 shadow-2xl">
          <div className="flex justify-center mb-8 lg:mb-10">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 shadow-inner">
              <UserPlus className="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
          </div>

          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              <Sparkles size={12} className="text-violet-500" />
              Registration Protocol
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 italic">
              <span className="premium-gradient-text">DAFTAR</span>
              <span className="text-white/20"> SYSTEM</span>
            </h1>
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Mulai perjalanan 30 hari PWA</p>
          </div>

          <div className="space-y-4 mb-10">
            <Input
              type="email"
              placeholder="Email Address"
              className="bg-zinc-950/50 border-white/5 text-sm py-6 rounded-2xl focus:border-emerald-500/50 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              className="bg-zinc-950/50 border-white/5 text-sm py-6 rounded-2xl focus:border-emerald-500/50 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full py-7 rounded-full text-[10px] font-black tracking-[0.3em] bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-8" disabled={loading}>
            {loading ? 'CREATING ACCOUNT...' : 'REGISTER AUTHORITY'}
          </Button>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />

          <p className="text-center text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            Sudah punya akun? <Link to="/login" className="text-white hover:text-emerald-400 transition-colors ml-2 font-black italic underline underline-offset-4">Masuk</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}