import { useEffect, useState } from 'react'
import axios from 'axios'

const EditProduct = () => {
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        let products = await axios.get('http://localhost:3000/api/products')
        setProducts(products.data)
    }

    const handleEditClick = (product) => {
        setSelectedProduct({ ...product }) 
        setShowModal(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setSelectedProduct((prev) => ({
            ...prev,
            [name]: name === "quantity" || name === "price" ? Number(value) : value
        }))
    }

    const handleEditConfirm = async () => {
        try {
            const { name, category, quantity, price, description } = selectedProduct
            await axios.put(`http://localhost:3000/api/products/${selectedProduct.id}`, {
                productName: name,
                category,
                quantity,
                price,
                description
            })

            fetchProducts()
            alert(`Product "${name}" updated successfully`)
            setShowModal(false)
        } catch (error) {
            console.error("Error updating product: ", error)
        }
    }

    return (
        <>
            <div className="overflow-x-auto p-4 absolute w-screen mt-20">
                <table className="border border-gray-300 shadow-md rounded-lg overflow-hidden w-full">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3 text-left border-b">Product ID</th>
                            <th className="px-6 py-3 text-left border-b">Product Name</th>
                            <th className="px-6 py-3 text-left border-b">Category</th>
                            <th className="px-6 py-3 text-left border-b">Quantity</th>
                            <th className="px-6 py-3 text-left border-b">Price</th>
                            <th className="px-6 py-3 text-left border-b">Description</th>
                            <th className="px-6 py-3 text-left border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 border-b">{product.id}</td>
                                <td className="px-6 py-4 border-b">{product.name}</td>
                                <td className="px-6 py-4 border-b">{product.category}</td>
                                <td className="px-6 py-4 border-b">{product.quantity}</td>
                                <td className="px-6 py-4 border-b">&#8377;{product.price}</td>
                                <td className="px-6 py-4 border-b">{product.description}</td>
                                <td className="px-6 py-4 border-b">
                                    <button onClick={() => handleEditClick(product)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && selectedProduct && (
                <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

                        <div className="space-y-3 text-sm text-gray-800">
                            <div>
                                <label className="block font-medium mb-1">ID:</label>
                                <input value={selectedProduct.id} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Name:</label>
                                <input type="text" name="name" value={selectedProduct.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Category:</label>
                                <input type="text" name="category" value={selectedProduct.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Quantity:</label>
                                <input type="number" name="quantity" value={selectedProduct.quantity} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Price (₹):</label>
                                <input type="number" name="price" value={selectedProduct.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Description:</label>
                                <textarea name="description" value={selectedProduct.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 text-sm hover:bg-gray-400">
                                Cancel
                            </button>
                            <button onClick={handleEditConfirm} className="px-4 py-2 rounded bg-green-500 text-white text-sm hover:bg-green-600">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditProduct
