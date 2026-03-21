/**
 * Modal reutilizable con overlay.
 * @param {boolean} isOpen - Controla si el modal está visible
 * @param {string} title - Título del modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {React.ReactNode} children - Contenido del modal
 */

const Modal = ({ isOpen, title, onClose, children }) => {
  // No renderiza nada si el modal está cerrado
  if (!isOpen) return null

  return (
    // Overlay oscuro que cubre toda la pantalla
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">

        {/* Header del modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="px-6 py-4">
          {children}
        </div>

      </div>
    </div>
  )
}

export default Modal