import { useState } from 'react'
import useProducts from '../../hooks/useProducts'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import ProductForm from './ProductForm'
import DeleteModal from './DeleteModal'

/** Cabeceras de la tabla de productos */
const TABLE_HEADERS = ['Código', 'Nombre', 'Categoría', 'Precio', 'Acciones']

/**
 * Página principal de gestión de productos.
 * Lista, crea, edita y elimina productos.
 */
const ProductsPage = () => {
  const { products, categories, loading, error, createProduct, updateProduct, deleteProduct } = useProducts()

  // Estado del modal de formulario
  const [formOpen, setFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Estado del modal de confirmación de eliminación
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  /** Abre el formulario para crear un nuevo producto */
  const handleOpenCreate = () => {
    setSelectedProduct(null)
    setFormOpen(true)
  }

  /** Abre el formulario para editar un producto existente */
  const handleOpenEdit = (product) => {
    setSelectedProduct(product)
    setFormOpen(true)
  }

  /** Abre el modal de confirmación de eliminación */
  const handleOpenDelete = (product) => {
    setProductToDelete(product)
    setDeleteOpen(true)
  }

  /** Envía el formulario de creación o edición */
  const handleSubmitForm = async (data) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, data)
    } else {
      await createProduct(data)
    }
    setFormOpen(false)
  }

  /** Confirma y ejecuta la eliminación del producto */
  const handleConfirmDelete = async () => {
    await deleteProduct(productToDelete.id)
    setDeleteOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
        <Button onClick={handleOpenCreate}>+ Nuevo producto</Button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Tabla */}
      {loading ? (
        <p className="text-gray-500 text-sm">Cargando productos...</p>
      ) : (
        <Table headers={TABLE_HEADERS}>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-6 text-center text-gray-400 text-sm">
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{product.code}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <Button variant="secondary" onClick={() => handleOpenEdit(product)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleOpenDelete(product)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </Table>
      )}

      {/* Modal formulario */}
      <ProductForm
        isOpen={formOpen}
        product={selectedProduct}
        categories={categories}
        onSubmit={handleSubmitForm}
        onClose={() => setFormOpen(false)}
      />

      {/* Modal confirmación eliminar */}
      <DeleteModal
        isOpen={deleteOpen}
        product={productToDelete}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteOpen(false)}
      />

    </div>
  )
}

export default ProductsPage