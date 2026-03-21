import { NavLink } from 'react-router-dom'

/**
 * Barra de navegación principal con dark mode y responsive.
 */
const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-[#7F77DD22] text-[#AFA9EC] border border-[#7F77DD44]'
        : 'text-[#9490b8] hover:bg-[#ffffff0a] hover:text-[#c8c4e8] border border-transparent'
    }`

  return (
    <nav className="bg-[#17171f] border-b border-[#2e2b45] px-6 py-0 flex items-center gap-2 h-14 sticky top-0 z-40">
      <span className="text-base font-medium text-[#e2e0f0] mr-4">Gestión</span>
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