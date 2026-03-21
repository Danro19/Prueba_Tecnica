import { useEffect, useState } from 'react'

/**
 * Modal reutilizable con overlay y animación para dark mode.
 * @param {boolean} isOpen - Controla si el modal está visible
 * @param {string} title - Título del modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {React.ReactNode} children - Contenido del modal
 */

const Modal1 = ({ isOpen, title, onClose, children }) => {
  const [visible, setVisible] = useState(false)

  // Animación de entrada
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setVisible(true), 10)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300
        ${visible ? 'bg-black/60' : 'bg-black/0'}
      `}
      onClick={onClose}
    >
      <div
        className={`
          bg-[#17171f] border border-[#2e2b45] rounded-xl w-full max-w-md mx-4
          transition-all duration-300
          ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2b45]">
          <h2 className="text-base font-medium text-[#e2e0f0]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#6b6890] hover:text-[#c4c0e0] transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal1