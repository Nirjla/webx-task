export default function CardWrapper({ children }) {
      return (<>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  {children && children}
            </div>
      </>)
}