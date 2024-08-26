export default function TableRowWrapper({children}){
      return(<>
        <tr className="border-b border-gray-200">
            {children && children}
        </tr>
      </>)
}