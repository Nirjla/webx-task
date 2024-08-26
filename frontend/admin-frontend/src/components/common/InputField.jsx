
export default function InputField({ name, title,value, onChange, type = 'text' }) {
      return (<>
         <div className="mb-7">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 capitalized">
                  {title}
            </label>
            <input
                  id={name}
                  name={name}
                  value={value}
                  type={type}
                  onChange={onChange && onChange}
                  required
                  className="mt-3 block w-full rounded-md 
                  pl-2
                  py-1.5
                  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            </div>
      </>)
}