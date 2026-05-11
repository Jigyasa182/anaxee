const ProductTable = () => {
  return (
    <div>
      <table>
        <thead className="bg-gray-50">
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Amount</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">Product 1]</td>
            <td className="px-6 py-4 whitespace-nowrap">SKU1</td>
            <td className="px-6 py-4 whitespace-nowrap">Category 1</td>
            <td className="px-6 py-4 whitespace-nowrap">$19.99</td>
            <td className="px-6 py-4 whitespace-nowrap">100</td>
            <td className="px-6 py-4 whitespace-nowrap">2023-01-01</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="text-blue-500 hover:text-blue-700">Edit</button>
              <button className="text-red-500 hover:text-red-700 ml-2">Delete</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
