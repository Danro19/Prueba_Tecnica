import { useState, useEffect } from 'react'
import Modal from '../../components/ui/Modal1'
import Button from '../../components/ui/Button'

/**
 * Formulario para crear y editar productos.
 * @param {boolean} isOpen - Controla si el modal está visible
 * @param {object|null} product - Producto a editar. null para crear.
 * @param {object[]} categories - Lista de categorías disponibles
 * @param {function} onSubmit - Función al enviar el formulario
 * @param {function} onClose - Función para cerrar el modal
 */
const INITIAL_FORM = {
  code: '',
  name: '',
  price: '',
  category_id: '',
}

const ProductForm = ({ isOpen, product, categories, onSubmit, onClose }) => {
  const [form, setForm] = useState(INITIAL_FORM)

  // Carga los datos del producto al editar, o limpia el formulario al crear
  useEffect(() => {
    if (product) {
      setForm({
        code: product.code,
        name: product.name,
        price: product.price,
        category_id: product.category.id,
      })
    } else {
      setForm(INITIAL_FORM)
    }
  }, [product, isOpen])

  /** Actualiza el campo correspondiente en el estado del formulario */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /** Envía el formulario con los datos actuales */
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      price: parseFloat(form.price),
      category_id: parseInt(form.category_id),
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      title={product ? 'Editar producto' : 'Crear producto'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Código */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {product ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>

      </form>
    </Modal>
  )
}

export default ProductForm