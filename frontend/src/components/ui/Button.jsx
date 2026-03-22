/**
 * Botón reutilizable con variantes de estilo para dark mode.
 * @param {string} variant - 'primary' | 'danger' | 'secondary'
 * @param {function} onClick - Función al hacer click
 * @param {string} type - Tipo del botón (button | submit)
 * @param {React.ReactNode} children - Contenido del botón
 * @param {boolean} disabled - Deshabilita el botón
 */

const variants = {
  primary: 'bg-[#7F77DD] hover:bg-[#9490c8] text-white border-transparent',
  danger: 'bg-transparent hover:bg-[#e2736a11] text-[#e2736a] border-[#2e2b45] hover:border-[#e2736a66]',
  secondary: 'bg-transparent hover:bg-[#ffffff0a] text-[#9490b8] border-[#2e2b45] hover:border-[#7F77DD66] hover:text-[#AFA9EC]',
}

const Button = ({ variant = 'primary', onClick, type = 'button', children, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  )
}

export default Button