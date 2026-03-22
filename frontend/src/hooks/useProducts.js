import { useState, useEffect } from 'react'
import productService from '../services/productService'
import categoryService from '../services/categoryService'

/**
 * Hook que centraliza el estado y las operaciones de productos.
 * Soporta filtros por categoría y código.
 */
const useProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Estado de los filtros activos
  const [filters, setFilters] = useState({ categoryId: '', code: '' })

  /** Carga productos aplicando los filtros actuales */
  const fetchProducts = async (activeFilters = filters) => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getAll({
        categoryId: activeFilters.categoryId || undefined,
        code: activeFilters.code || undefined,
      })
      setProducts(data)
    } catch {
      setError('Error al cargar los productos.')
    } finally {
      setLoading(false)
    }
  }

  /** Carga todas las categorías */
  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch {
      setError('Error al cargar las categorías.')
    }
  }

  /** Actualiza un filtro y recarga los productos */
  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    fetchProducts(updated)
  }

  /** Limpia todos los filtros */
  const clearFilters = () => {
    const reset = { categoryId: '', code: '' }
    setFilters(reset)
    fetchProducts(reset)
  }

  const createProduct = async (data) => {
    await productService.create(data)
    await fetchProducts()
  }

  const updateProduct = async (id, data) => {
    await productService.update(id, data)
    await fetchProducts()
  }

  const deleteProduct = async (id) => {
    await productService.delete(id)
    await fetchProducts()
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  return {
    products,
    categories,
    loading,
    error,
    filters,
    updateFilter,
    clearFilters,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}

export default useProducts