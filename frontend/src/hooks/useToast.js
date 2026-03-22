import { useState, useCallback } from 'react'

/**
 * Hook para manejar notificaciones toast.
 * Expone el estado del toast y la función para mostrarlo.
 */
const useToast = () => {
  const [toast, setToast] = useState(null)

  /**
   * Muestra un toast por 3 segundos.
   * @param {string} message - Mensaje a mostrar
   * @param {'success'|'info'|'danger'} type - Tipo de toast
   */
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  return { toast, showToast }
}

export default useToast