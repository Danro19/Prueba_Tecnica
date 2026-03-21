import { useState, useEffect } from 'react'
import Modal1 from '../../components/ui/Modal1'
import Button from '../../components/ui/Button'

/**
 * Formulario para crear y editar categorías con dark mode.
 */
const INITIAL_FORM = { name: '' }

const inputClass = `
  w-full bg-[#0f0f13] border border-[#2e2b45] rounded-md px-3 py-2 text-sm
  text-[#e2e0f0] placeholder-[#6b6890]
  focus:outline-none focus:border-[#7F77DD] focus:ring-1 focus:ring-[#7F77DD44]
  transition-colors duration-200
`

const CategoryForm = ({ isOpen, category, onSubmit, onClose }) => {
  const [form, setForm] = useState(INITIAL_FORM)

  useEffect(() => {
    if (category) {
      setForm({ name: category.name })
    } else {
      setForm(INITIAL_FORM)
    }
  }, [category, isOpen])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <Modal1
      isOpen={isOpen}
      title={category ? 'Editar categoría' : 'Nueva categoría'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label className="block text-xs font-medium text-[#9490b8] mb-1">Nombre</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Nombre de la categoría" />
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <Button variant="secondary" onClick={onClose} type="button">Cancelar</Button>
          <Button variant="primary" type="submit">
            {category ? 'Guardar cambios' : 'Crear categoría'}
          </Button>
        </div>

      </form>
    </Modal1>
  )
}

export default CategoryForm