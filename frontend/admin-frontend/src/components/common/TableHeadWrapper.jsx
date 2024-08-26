export default function TableHeadWrapper({ children }) {
      return (<>
            <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                        {children && children}
                  </tr>
            </thead>
      </>)
}