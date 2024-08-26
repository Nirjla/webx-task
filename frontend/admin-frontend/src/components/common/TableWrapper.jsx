export default function TableWrapper({ children }) {
      return (<>

            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">

                  {children && children}

            </table>
      </>)
}