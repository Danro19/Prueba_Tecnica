import { useEffect, useState } from 'react'

/**
 * Componente de notificación toast con animación de entrada y salida.
 * @param {string} message - Mensaje a mostrar
 * @param {'success'|'info'|'danger'} type - Tipo visual del toast
 * @param {function} onClose - Función para cerrar el toast
 */

const STYLES = {
  success: {
    bar: 'bg-emerald-500',
    text: 'text-emerald-400',
    icon: '✓',
  },
  info: {
    bar: 'bg-purple-500',
    text: 'text-purple-400',
    icon: '✎',
  },
  danger: {
    bar: 'bg-red-500',
    text: 'text-red-400',
    icon: '✕',
  },
}

const Toast = ({ message, type = 'success', onClose }) => {
  const [visible, setVisible] = useState(false)

  // Animación de entrada al montar
  useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(enter)
  }, [])

  const style = STYLES[type]

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 flex items-center gap-3
        bg-[#17171f] border border-[#2e2b45] rounded-lg px-4 py-3 shadow-lg
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {/* Barra de color lateral */}
      <div className={`w-1 h-8 rounded-full ${style.bar}`} />

      {/* Icono */}
      <span className={`text-sm font-bold ${style.text}`}>{style.icon}</span>

      {/* Mensaje */}
      <p className="text-sm text-[#c4c0e0]">{message}</p>

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="ml-2 text-[#6b6890] hover:text-[#c4c0e0] text-xs transition-colors"
      >
        ✕
      </button>
    </div>
  )
}

export default Toast