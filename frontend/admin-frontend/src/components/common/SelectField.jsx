export default function SelectField({ name, title, value, data, onChange }) {
      console.log(`SelectField - Name: ${name}, Value: ${value}`); // Debugging
    
      return (
        <div className="mb-7">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 capitalize">
            {title}
          </label>
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => {
              console.log(`SelectField - OnChange - ${name}: ${e.target.value}`); // Debugging
              onChange(e);
            }} // Ensure this line is included
            className="mt-3 block w-full rounded-md bg-transparent pl-2 py-3.5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option>Select</option>
            {data && data.length > 0 ? (
              data.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option value="" disabled>No options available</option>
            )}
          </select>
        </div>
      );
    }
    