import { useState, useEffect } from 'react'
import productService from '../services/productService'
import categoryService from '../services/categoryService'

/**
 * Hook que centraliza el estado y las operaciones de productos.
 * Expone datos y acciones para ser consumidos por las páginas.
 */
const useProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /** Carga todos los productos desde la API */
  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError('Error al cargar los productos.')
    } finally {
      setLoading(false)
    }
  }

  /** Carga todas las categorías desde la API */
  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError('Error al cargar las categorías.')
    }
  }

  /** Crea un nuevo producto y recarga la lista */
  const createProduct = async (data) => {
    await productService.create(data)
    await fetchProducts()
  }

  /** Actualiza un producto existente y recarga la lista */
  const updateProduct = async (id, data) => {
    await productService.update(id, data)
    await fetchProducts()
  }

  /** Elimina un producto y recarga la lista */
  const deleteProduct = async (id) => {
    await productService.delete(id)
    await fetchProducts()
  }

  // Carga inicial de productos y categorías al montar el hook
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  return {
    products,
    categories,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}

export default useProducts