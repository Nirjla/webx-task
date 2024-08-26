import React from 'react';

export default function CheckboxField({ data, name, title, value, onChange }) {
  return (
    <div className="mb-7">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 capitalize">{title}</label>
      <div className="flex flex-wrap mt-3">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="flex items-center me-4">
              <input
                id={item._id}
                type="checkbox"
                value={item._id}
                checked={value.includes(item._id)}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={item._id} className="ms-2 text-sm font-medium text-gray-700">{item.name}</label>
            </div>
          ))
        ) : (
          <p className='text-sm font-medium text-gray-700 '>No subcategories found</p> 
        )}
      </div>
    </div>
  );
}