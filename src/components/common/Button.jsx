const Button = ({
  children,
  type = 'button',
  fullWidth = false,
  onClick,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  const base =
    'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-golden-500 text-white hover:bg-golden-600 focus:ring-golden-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          Chargement...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
