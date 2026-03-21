import axios from 'axios'

// Base URL tomada desde las variables de entorno
const API_URL = `${import.meta.env.VITE_API_URL}/categories`

const categoryService = {
  /** Retorna todas las categorías */
  getAll: async () => {
    const response = await axios.get(`${API_URL}/`)
    return response.data
  },

  /** Retorna una categoría por su ID */
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  /** Crea una nueva categoría */
  create: async (data) => {
    const response = await axios.post(`${API_URL}/`, data)
    return response.data
  },

  /** Actualiza una categoría existente */
  update: async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data)
    return response.data
  },

  /** Elimina una categoría por su ID */
  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`)
  },
}

export default categoryService