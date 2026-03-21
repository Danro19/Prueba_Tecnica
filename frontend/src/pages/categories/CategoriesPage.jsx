import { useState } from 'react'
import useCategories from '../../hooks/useCategories'
import useToast from '../../hooks/useToast'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import Toast from '../../components/ui/Toast'
import CategoryForm from './CategoryForm'
import DeleteModal from '../products/DeleteModal'

const TABLE_HEADERS = ['Nombre', 'Fecha creación', 'Acciones']

/**
 * Página principal de gestión de categorías con dark mode y toasts.
 */
const CategoriesPage = () => {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory } = useCategories()
  const { toast, showToast } = useToast()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  const handleOpenCreate = () => {
    setSelectedCategory(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (category) => {
    setSelectedCategory(category)
    setFormOpen(true)
  }

  const handleOpenDelete = (category) => {
    setCategoryToDelete(category)
    setDeleteOpen(true)
  }

  const handleSubmitForm = async (data) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, data)
        showToast('Categoría actualizada correctamente.', 'info')
      } else {
        await createCategory(data)
        showToast('Categoría creada correctamente.', 'success')
      }
      setFormOpen(false)
    } catch {
      showToast('Ocurrió un error. Intenta de nuevo.', 'danger')
    }
  }

  const handleConfirmDelete = async () => {
  try {
    await deleteCategory(categoryToDelete.id)
    showToast('Categoría eliminada correctamente.', 'danger')
    setDeleteOpen(false)
    } catch (err) {
    // Captura el mensaje específico del backend
    const message =
      err.response?.data?.detail ||
      'No se pudo eliminar la categoría.'
    showToast(message, 'danger')
    setDeleteOpen(false)
    }
    }

  return (
    <div className="min-h-screen bg-[#0f0f13] p-6 md:p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-[#e2e0f0]">Categorías</h1>
          <p className="text-sm text-[#6b6890] mt-0.5">{categories.length} categorías registradas</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Nueva categoría</Button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-[#e2736a11] border border-[#e2736a33] text-[#e2736a] rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Tabla */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-[#6b6890]">Cargando categorías...</p>
        </div>
      ) : (
        <Table headers={TABLE_HEADERS}>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center text-[#6b6890] text-sm">
                No hay categorías registradas.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id} className="hover:bg-[#1e1d2a] transition-colors duration-150">
                <td className="px-5 py-4 text-sm text-[#c4c0e0]">{category.name}</td>
                <td className="px-5 py-4 text-sm text-[#6b6890]">
                  {new Date(category.created_at).toLocaleDateString('es-CO', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </td>
                <td className="px-5 py-4 text-sm">
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleOpenEdit(category)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleOpenDelete(category)}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      )}

      <CategoryForm isOpen={formOpen} category={selectedCategory} onSubmit={handleSubmitForm} onClose={() => setFormOpen(false)} />
      <DeleteModal isOpen={deleteOpen} product={categoryToDelete} onConfirm={handleConfirmDelete} onClose={() => setDeleteOpen(false)} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}

    </div>
  )
}

export default CategoriesPage