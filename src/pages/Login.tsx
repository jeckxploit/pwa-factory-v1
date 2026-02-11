import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Masuk ke PWA Factory</h1>
        <input 
          type="email" placeholder="Email" 
          className="w-full p-3 mb-4 bg-black border border-zinc-700 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-3 mb-6 bg-black border border-zinc-700 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition">
          Login
        </button>
        <p className="mt-4 text-center text-zinc-400">
          Belum punya akun? <Link to="/register" className="text-white underline">Daftar</Link>
        </p>
      </form>
    </div>
  )
}