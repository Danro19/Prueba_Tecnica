import { useState, useEffect } from 'react'
import Modal1 from '../../components/ui/Modal1'
import Button from '../../components/ui/Button'

/**
 * Formulario para crear y editar productos con dark mode.
 */

const INITIAL_FORM = { code: '', name: '', price: '', category_id: '' }

const inputClass = `
  w-full bg-[#0f0f13] border border-[#2e2b45] rounded-md px-3 py-2 text-sm
  text-[#e2e0f0] placeholder-[#6b6890]
  focus:outline-none focus:border-[#7F77DD] focus:ring-1 focus:ring-[#7F77DD44]
  transition-colors duration-200
`

const ProductForm = ({ isOpen, product, categories, onSubmit, onClose }) => {
  const [form, setForm] = useState(INITIAL_FORM)

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      price: parseFloat(form.price),
      category_id: parseInt(form.category_id),
    })
  }

  return (
    <Modal1
      isOpen={isOpen}
      title={product ? 'Editar producto' : 'Nuevo producto'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Código y Nombre en grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#9490b8] mb-1">Código</label>
            <input type="text" name="code" value={form.code} onChange={handleChange} required className={inputClass} placeholder="PRD-001" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#9490b8] mb-1">Nombre</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Nombre del producto" />
          </div>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-xs font-medium text-[#9490b8] mb-1">Precio</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required min="0" step="0.01" className={inputClass} placeholder="0.00" />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-xs font-medium text-[#9490b8] mb-1">Categoría</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3 pt-1">
          <Button variant="secondary" onClick={onClose} type="button">Cancelar</Button>
          <Button variant="primary" type="submit">
            {product ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>

      </form>
    </Modal1>
  )
}

export default ProductForm