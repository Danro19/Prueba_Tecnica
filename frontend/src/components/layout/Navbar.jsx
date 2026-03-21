import { NavLink } from 'react-router-dom'

/**
 * Barra de navegación principal.
 * Resalta la ruta activa automáticamente.
 */
const Navbar = () => {
  // Clases base y activa para los links
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-3 flex items-center gap-4">
      <span className="text-lg font-bold text-gray-800 mr-6">Gestión</span>
      <NavLink to="/" className={linkClass} end>
        Productos
      </NavLink>
      <NavLink to="/categories" className={linkClass}>
        Categorías
      </NavLink>
    </nav>
  )
}

export default Navbar