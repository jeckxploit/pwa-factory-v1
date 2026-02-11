import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ title, icon: Icon, variant = 'primary', className, ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    danger: "bg-red-600 text-white hover:bg-red-500"
  };

  return (
    <button 
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {props.children}
    </button>
  );
};