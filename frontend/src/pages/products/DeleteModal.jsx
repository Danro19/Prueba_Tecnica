import Modal1 from '../../components/ui/Modal1'
import Button from '../../components/ui/Button'

/**
 * Modal de confirmación para eliminar un elemento.
 * @param {boolean} isOpen - Controla si el modal está visible
 * @param {object} product - Elemento a eliminar
 * @param {function} onConfirm - Función al confirmar
 * @param {function} onClose - Función para cerrar
 */
const DeleteModal = ({ isOpen, product, onConfirm, onClose }) => {
  return (
    <Modal1 isOpen={isOpen} title="Confirmar eliminación" onClose={onClose}>

      <div className="flex flex-col gap-5">
        {/* Icono de advertencia */}
        <div className="flex items-center gap-3 p-4 bg-[#e2736a11] border border-[#e2736a33] rounded-lg">
          <span className="text-[#e2736a] text-lg">⚠</span>
          <p className="text-sm text-[#c4c0e0]">
            ¿Estás seguro de que deseas eliminar{' '}
            <span className="font-medium text-[#e2e0f0]">{product?.name}</span>?
            Esta acción no se puede deshacer.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Sí, eliminar
          </Button>
        </div>
      </div>

    </Modal1>
  )
}

export default DeleteModal