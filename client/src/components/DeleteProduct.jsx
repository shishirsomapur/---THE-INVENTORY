import { useEffect, useState } from 'react'
import axios from 'axios'

const DeleteProduct = () => {
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3000/api/products')
        setProducts(response.data)
    }

    const handleDeleteClick = (product) => {
        setSelectedProduct(product)
        setShowModal(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${selectedProduct.id}`)
            fetchProducts()
            alert(`Deleted Product "${selectedProduct.name}" successfully`)
            setShowModal(false)
        } catch (error) {
            console.error("Error deleting product: ", error)
        }
    }

    return (
        <>
            <div className="p-4 pt-24 w-full overflow-x-auto">
                <div className="w-full max-w-full overflow-auto">
                    <table className="w-full min-w-[700px] text-sm text-left border border-gray-200 shadow rounded-lg">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 border-b">ID</th>
                                <th className="px-4 py-3 border-b">Name</th>
                                <th className="px-4 py-3 border-b">Category</th>
                                <th className="px-4 py-3 border-b">Qty</th>
                                <th className="px-4 py-3 border-b">Price</th>
                                <th className="px-4 py-3 border-b">Description</th>
                                <th className="px-4 py-3 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-2 border-b">{product.id}</td>
                                    <td className="px-4 py-2 border-b">{product.name}</td>
                                    <td className="px-4 py-2 border-b">{product.category}</td>
                                    <td className="px-4 py-2 border-b">{product.quantity}</td>
                                    <td className="px-4 py-2 border-b">₹{product.price}</td>
                                    <td className="px-4 py-2 border-b">{product.description}</td>
                                    <td className="px-4 py-2 border-b">
                                        <button
                                            onClick={() => handleDeleteClick(product)}
                                            className="bg-red-400 hover:bg-red-500 text-white text-xs font-medium px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && selectedProduct && (
                <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
                        <h2 className="text-lg font-semibold mb-4 text-center">Confirm Deletion</h2>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p><strong>ID:</strong> {selectedProduct.id}</p>
                            <p><strong>Name:</strong> {selectedProduct.name}</p>
                            <p><strong>Category:</strong> {selectedProduct.category}</p>
                            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                            <p><strong>Description:</strong> {selectedProduct.description}</p>
                        </div>
                        <div className="mt-6 flex justify-end gap-3 flex-wrap">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteProduct
