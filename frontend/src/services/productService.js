import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/products`

const productService = {
  /** Retorna todos los productos con filtros opcionales */
  getAll: async ({ categoryId, code } = {}) => {
    const params = {}
    if (categoryId) params.category_id = categoryId
    if (code) params.code = code
    const response = await axios.get(`${API_URL}/`, { params })
    return response.data
  },

  /** Retorna un producto por su ID */
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  /** Crea un nuevo producto */
  create: async (data) => {
    const response = await axios.post(`${API_URL}/`, data)
    return response.data
  },

  /** Actualiza un producto existente */
  update: async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data)
    return response.data
  },

  /** Elimina un producto por su ID */
  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`)
  },
}

export default productService