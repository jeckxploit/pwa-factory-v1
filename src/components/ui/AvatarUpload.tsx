import React, { useState } from 'react'
import { supabase } from '../../services/supabase'
import { Camera, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export const AvatarUpload = ({ url, onUpload }: { url?: string, onUpload: (url: string) => void }) => {
  const [uploading, setUploading] = useState(false)

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) throw new Error('Pilih file dulu!')

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      onUpload(data.publicUrl)
      toast.success('Foto profil diperbarui!')
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan'
      toast.error(message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative w-32 h-32 group">
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900 flex items-center justify-center">
        {url ? (
          <img src={url} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <Camera className="text-zinc-700" size={32} />
        )}
      </div>
      <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
        {uploading ? <Loader2 className="animate-spin" /> : <span className="text-xs font-bold">GANTI</span>}
        <input type="file" className="hidden" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
      </label>
    </div>
  )
}