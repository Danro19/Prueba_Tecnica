/**
 * Tabla reutilizable con estilo dark mode.
 * @param {string[]} headers - Títulos de las columnas
 * @param {React.ReactNode} children - Filas de la tabla
 */

const Table = ({ headers, children }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#2e2b45]">
      <table className="min-w-full">

        {/* Cabecera */}
        <thead>
          <tr className="bg-[#1e1d2a]">
            {headers.map((header) => (
              <th
                key={header}
                className="px-5 py-3 text-left text-[11px] font-medium text-[#6b6890] uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Filas */}
        <tbody className="bg-[#17171f] divide-y divide-[#1e1d2a]">
          {children}
        </tbody>

      </table>
    </div>
  )
}

export default Table