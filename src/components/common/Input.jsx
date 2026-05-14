const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  required,
  name,
  placeholder,
  disabled,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-golden-400 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors ${
        error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
)

export default Input
