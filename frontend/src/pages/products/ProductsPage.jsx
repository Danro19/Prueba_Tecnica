import { useState } from 'react'
import useProducts from '../../hooks/useProducts'
import useToast from '../../hooks/useToast'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import Toast from '../../components/ui/Toast'
import Modal1 from '../../components/ui/Modal1'
import ProductForm from './ProductForm'
import DeleteModal from './DeleteModal'
import { useNavigate } from 'react-router-dom'

const TABLE_HEADERS = ['Código', 'Nombre', 'Categoría', 'Precio', 'Acciones']

const inputClass = `
  bg-[#0f0f13] border border-[#2e2b45] rounded-md px-3 py-2 text-sm
  text-[#e2e0f0] placeholder-[#6b6890]
  focus:outline-none focus:border-[#7F77DD] focus:ring-1 focus:ring-[#7F77DD44]
  transition-colors duration-200
`

const ProductsPage = () => {
  const {
    products, categories, loading, error,
    filters, updateFilter, clearFilters,
    createProduct, updateProduct, deleteProduct
  } = useProducts()
  const { toast, showToast } = useToast()
  const navigate = useNavigate()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [noCategoryOpen, setNoCategoryOpen] = useState(false)

  const handleOpenCreate = () => {
    // Verifica si hay categorías antes de abrir el formulario
    if (categories.length === 0) {
      setNoCategoryOpen(true)
      return
    }
    setSelectedProduct(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (product) => {
    setSelectedProduct(product)
    setFormOpen(true)
  }

  const handleOpenDelete = (product) => {
    setProductToDelete(product)
    setDeleteOpen(true)
  }

  const handleSubmitForm = async (data) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, data)
        showToast('Producto actualizado correctamente.', 'info')
      } else {
        await createProduct(data)
        showToast('Producto creado correctamente.', 'success')
      }
      setFormOpen(false)
    } catch (err) {
      const message = err.response?.data?.detail || 'Ocurrió un error. Intenta de nuevo.'
      showToast(message, 'danger')
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id)
      showToast('Producto eliminado correctamente.', 'danger')
      setDeleteOpen(false)
    } catch (err) {
      const message = err.response?.data?.detail || 'No se pudo eliminar el producto.'
      showToast(message, 'danger')
      setDeleteOpen(false)
    }
  }

  const hasFilters = filters.categoryId || filters.code

  return (
    <div className="min-h-screen bg-[#0f0f13] p-6 md:p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-[#e2e0f0]">Productos</h1>
          <p className="text-sm text-[#6b6890] mt-0.5">{products.length} productos encontrados</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Nuevo producto</Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Buscar por código..."
          value={filters.code}
          onChange={(e) => updateFilter('code', e.target.value)}
          className={`${inputClass} w-full sm:w-56`}
        />
        <select
          value={filters.categoryId}
          onChange={(e) => updateFilter('categoryId', e.target.value)}
          className={`${inputClass} w-full sm:w-48 cursor-pointer`}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {hasFilters && (
          <Button variant="secondary" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        )}
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
          <p className="text-sm text-[#6b6890]">Cargando productos...</p>
        </div>
      ) : (
        <Table headers={TABLE_HEADERS}>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-[#6b6890] text-sm">
                {hasFilters ? 'No se encontraron productos con esos filtros.' : 'No hay productos registrados.'}
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-[#1e1d2a] transition-colors duration-150">
                <td className="px-5 py-4 text-sm font-medium text-[#7F77DD]">{product.code}</td>
                <td className="px-5 py-4 text-sm text-[#c4c0e0]">{product.name}</td>
                <td className="px-5 py-4 text-sm">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#7F77DD22] text-[#AFA9EC] border border-[#7F77DD44]">
                    {product.category.name}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#c4c0e0]">${product.price.toFixed(2)}</td>
                <td className="px-5 py-4 text-sm">
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleOpenEdit(product)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleOpenDelete(product)}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      )}

      {/* Modal sin categorías */}
      <Modal1
        isOpen={noCategoryOpen}
        title="Sin categorías disponibles"
        onClose={() => setNoCategoryOpen(false)}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3 p-4 bg-[#7F77DD11] border border-[#7F77DD33] rounded-lg">
            <span className="text-[#AFA9EC] text-lg">ℹ</span>
            <p className="text-sm text-[#c4c0e0]">
              Para crear un producto primero necesitas tener al menos una categoría registrada.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setNoCategoryOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setNoCategoryOpen(false)
                navigate('/categories')
              }}
            >
              Ir a Categorías
            </Button>
          </div>
        </div>
      </Modal1>

      <ProductForm isOpen={formOpen} product={selectedProduct} categories={categories} onSubmit={handleSubmitForm} onClose={() => setFormOpen(false)} />
      <DeleteModal isOpen={deleteOpen} product={productToDelete} onConfirm={handleConfirmDelete} onClose={() => setDeleteOpen(false)} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}

    </div>
  )
}

export default ProductsPage