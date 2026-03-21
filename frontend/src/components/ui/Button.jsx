/**
 * Botón reutilizable con variantes de estilo.
 * @param {string} variant - 'primary' | 'danger' | 'secondary'
 * @param {function} onClick - Función al hacer click
 * @param {string} type - Tipo del botón (button | submit)
 * @param {React.ReactNode} children - Contenido del botón
 */

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
}

const Button = ({ variant = 'primary', onClick, type = 'button', children, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button