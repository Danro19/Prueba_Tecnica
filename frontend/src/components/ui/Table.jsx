/**
 * Tabla reutilizable con cabeceras y filas dinámicas.
 * @param {string[]} headers - Títulos de las columnas
 * @param {React.ReactNode} children - Filas de la tabla (tr)
 */

const Table = ({ headers, children }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">

        {/* Cabecera */}
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Filas */}
        <tbody className="bg-white divide-y divide-gray-200">
          {children}
        </tbody>

      </table>
    </div>
  )
}

export default Table