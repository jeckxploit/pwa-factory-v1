import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';

export default function Navbar({ userEmail }: { userEmail: string }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white shadow">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>{userEmail}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}