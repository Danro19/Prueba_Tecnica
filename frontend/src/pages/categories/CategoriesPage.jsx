import { useState } from 'react'
import useCategories from '../../hooks/useCategories'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import CategoryForm from './CategoryForm'
import DeleteModal from '../products/DeleteModal'

/** Cabeceras de la tabla de categorías */
const TABLE_HEADERS = ['Nombre', 'Fecha creación', 'Acciones']

/**
 * Página principal de gestión de categorías.
 * Lista, crea, edita y elimina categorías.
 */
const CategoriesPage = () => {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory } = useCategories()

  // Estado del modal de formulario
  const [formOpen, setFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Estado del modal de confirmación de eliminación
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  /** Abre el formulario para crear una nueva categoría */
  const handleOpenCreate = () => {
    setSelectedCategory(null)
    setFormOpen(true)
  }

  /** Abre el formulario para editar una categoría existente */
  const handleOpenEdit = (category) => {
    setSelectedCategory(category)
    setFormOpen(true)
  }

  /** Abre el modal de confirmación de eliminación */
  const handleOpenDelete = (category) => {
    setCategoryToDelete(category)
    setDeleteOpen(true)
  }

  /** Envía el formulario de creación o edición */
  const handleSubmitForm = async (data) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory.id, data)
    } else {
      await createCategory(data)
    }
    setFormOpen(false)
  }

  /** Confirma y ejecuta la eliminación de la categoría */
  const handleConfirmDelete = async () => {
    await deleteCategory(categoryToDelete.id)
    setDeleteOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categorías</h1>
        <Button onClick={handleOpenCreate}>+ Nueva categoría</Button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Tabla */}
      {loading ? (
        <p className="text-gray-500 text-sm">Cargando categorías...</p>
      ) : (
        <Table headers={TABLE_HEADERS}>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-6 text-center text-gray-400 text-sm">
                No hay categorías registradas.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(category.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <Button variant="secondary" onClick={() => handleOpenEdit(category)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleOpenDelete(category)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </Table>
      )}

      {/* Modal formulario */}
      <CategoryForm
        isOpen={formOpen}
        category={selectedCategory}
        onSubmit={handleSubmitForm}
        onClose={() => setFormOpen(false)}
      />

      {/* Modal confirmación eliminar */}
      <DeleteModal
        isOpen={deleteOpen}
        product={categoryToDelete}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteOpen(false)}
      />

    </div>
  )
}

export default CategoriesPage