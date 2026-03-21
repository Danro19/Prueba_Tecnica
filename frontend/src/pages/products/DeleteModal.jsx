import Modal from '../../components/ui/Modal1'
import Button from '../../components/ui/Button'

/**
 * Modal de confirmación para eliminar un producto.
 * @param {boolean} isOpen - Controla si el modal está visible
 * @param {object} product - Producto a eliminar
 * @param {function} onConfirm - Función al confirmar la eliminación
 * @param {function} onClose - Función para cerrar el modal
 */
const DeleteModal = ({ isOpen, product, onConfirm, onClose }) => {
  return (
    <Modal isOpen={isOpen} title="Eliminar producto" onClose={onClose}>

      {/* Mensaje de confirmación */}
      <p className="text-gray-600 mb-6">
        ¿Estás seguro de que deseas eliminar el producto{' '}
        <span className="font-semibold text-gray-800">{product?.name}</span>?
        Esta acción no se puede deshacer.
      </p>

      {/* Acciones */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Eliminar
        </Button>
      </div>

    </Modal>
  )
}

export default DeleteModal