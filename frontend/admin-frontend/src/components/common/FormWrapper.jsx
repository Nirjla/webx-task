export default function FormWrapper({ children, onSubmit }) {
      return (<>
            <form onSubmit={onSubmit && onSubmit} className="bg-white p-6 rounded-lg shadow-md">
                  {children && children}
            </form>
      </>)
}