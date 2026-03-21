import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ProductsPage from './pages/products/ProductsPage'
import CategoriesPage from './pages/categories/CategoriesPage'

function App() {
  return (
    <>
      {/* Navbar visible en todas las rutas */}
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </>
  )
}

export default App