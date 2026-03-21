import { useState, useEffect } from 'react'
import Modal from '../../components/ui/Modal1'
import Button from '../../components/ui/Button'

/**
 * Formulario para crear y editar categorías.
 * @param {boolean} isOpen - Controla si el modal está visible
 * @param {object|null} category - Categoría a editar. null para crear.
 * @param {function} onSubmit - Función al enviar el formulario
 * @param {function} onClose - Función para cerrar el modal
 */
const INITIAL_FORM = { name: '' }

const CategoryForm = ({ isOpen, category, onSubmit, onClose }) => {
  const [form, setForm] = useState(INITIAL_FORM)

  // Carga los datos de la categoría al editar, o limpia el formulario al crear
  useEffect(() => {
    if (category) {
      setForm({ name: category.name })
    } else {
      setForm(INITIAL_FORM)
    }
  }, [category, isOpen])

  /** Actualiza el campo en el estado del formulario */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /** Envía el formulario con los datos actuales */
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <Modal
      isOpen={isOpen}
      title={category ? 'Editar categoría' : 'Crear categoría'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {category ? 'Guardar cambios' : 'Crear categoría'}
          </Button>
        </div>

      </form>
    </Modal>
  )
}

export default CategoryForm