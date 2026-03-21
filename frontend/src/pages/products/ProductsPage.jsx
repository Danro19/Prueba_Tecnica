import { useState } from 'react'
import useProducts from '../../hooks/useProducts'
import useToast from '../../hooks/useToast'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import Toast from '../../components/ui/Toast'
import ProductForm from './ProductForm'
import DeleteModal from './DeleteModal'

const TABLE_HEADERS = ['Código', 'Nombre', 'Categoría', 'Precio', 'Acciones']

/**
 * Página principal de gestión de productos con dark mode y toasts.
 */
const ProductsPage = () => {
  const { products, categories, loading, error, createProduct, updateProduct, deleteProduct } = useProducts()
  const { toast, showToast } = useToast()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  const handleOpenCreate = () => {
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
    } catch {
      showToast('Ocurrió un error. Intenta de nuevo.', 'danger')
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id)
      showToast('Producto eliminado correctamente.', 'danger')
      setDeleteOpen(false)
    } catch {
      showToast('No se pudo eliminar el producto.', 'danger')
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f13] p-6 md:p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-[#e2e0f0]">Productos</h1>
          <p className="text-sm text-[#6b6890] mt-0.5">{products.length} productos registrados</p>
        </div>
        <Button onClick={handleOpenCreate}>+ Nuevo producto</Button>
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
                No hay productos registrados.
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

      <ProductForm isOpen={formOpen} product={selectedProduct} categories={categories} onSubmit={handleSubmitForm} onClose={() => setFormOpen(false)} />
      <DeleteModal isOpen={deleteOpen} product={productToDelete} onConfirm={handleConfirmDelete} onClose={() => setDeleteOpen(false)} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}

    </div>
  )
}

export default ProductsPage