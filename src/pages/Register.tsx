import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert('Cek email kamu untuk verifikasi!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleRegister} className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-center">Buat Akun Baru</h1>
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
        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition">
          Daftar
        </button>
      </form>
    </div>
  )
}