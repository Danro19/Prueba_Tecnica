import { useState, useEffect } from 'react'
import categoryService from '../services/categoryService'

/**
 * Hook que centraliza el estado y las operaciones de categorías.
 * Expone datos y acciones para ser consumidos por las páginas.
 */
const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /** Carga todas las categorías desde la API */
  const fetchCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError('Error al cargar las categorías.')
    } finally {
      setLoading(false)
    }
  }

  /** Crea una nueva categoría y recarga la lista */
  const createCategory = async (data) => {
    await categoryService.create(data)
    await fetchCategories()
  }

  /** Actualiza una categoría existente y recarga la lista */
  const updateCategory = async (id, data) => {
    await categoryService.update(id, data)
    await fetchCategories()
  }

  /** Elimina una categoría y recarga la lista */
  const deleteCategory = async (id) => {
    await categoryService.delete(id)
    await fetchCategories()
  }

  // Carga inicial de categorías al montar el hook
  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}

export default useCategories