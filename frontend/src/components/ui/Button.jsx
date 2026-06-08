import { Loader2 } from 'lucide-react'

const variants = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  danger:    'bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50',
}

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${variants[variant]} flex items-center justify-center gap-2 ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}

export default Button