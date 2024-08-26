export default function TableData({ children }) {
      return (<>
            <td className="py-3 px-4 text-gray-700">{children && children}</td>
      </>)
}