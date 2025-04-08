import { useEffect, useState } from 'react'
import axios from 'axios'

const SellProduct = () => {
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [sellQuantity, setSellQuantity] = useState('')
    const [error, setError] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        let products = await axios.get('https://the-inventory-xnby.onrender.com/api/products')
        setProducts(products.data)
    }

    const handleSellClick = async (product) => {
        setSelectedProduct(product)
        setSellQuantity('')
        setError('')
        setTotalPrice(0)
        setShowModal(true)
    }

    const handleQuantityChange = (e) => {
        const value = e.target.value

        setSellQuantity(value)

        const selectedQuantity = parseInt(value)
        if (!selectedQuantity || selectedQuantity < 1) {
            setTotalPrice(0)
            setError('')
            return
        }

        if (selectedQuantity > selectedProduct.quantity) {
            setError('Quantity exceeds available stock.')
            setTotalPrice(0)
        } else {
            setError('')
            setTotalPrice(selectedQuantity * selectedProduct.price)
        }
    }


    const handleSellConfirm = async () => {
        try {
            await axios.put(`https://the-inventory-xnby.onrender.com/api/products/${selectedProduct.id}`, {
                productName: selectedProduct.name,
                category: selectedProduct.category,
                quantity: selectedProduct.quantity - sellQuantity,
                price: selectedProduct.price,
                description: selectedProduct.description
            })

            const txnResult = await axios.post("https://the-inventory-xnby.onrender.com/api/transactions", {
                productId: selectedProduct.id,
                quantity: sellQuantity,
                price: selectedProduct.price,
                totalAmount: totalPrice
            })

            console.log(txnResult.data.message)

            fetchProducts()
            alert(`Sold ${sellQuantity} of ${selectedProduct.name} for ₹${totalPrice}`)
            setShowModal(false)

        } 
        catch(error) {
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
                                    <button onClick={() => handleSellClick(product)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded">
                                        Sell
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && selectedProduct && (
                <div className="backdrop-blur-xs fixed inset-0 bg-blend-saturation bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-lg font-semibold mb-4">Sell Product</h2>
                        <div className="space-y-2 text-sm text-gray-800">
                            <p><strong>ID:</strong> {selectedProduct.id}</p>
                            <p><strong>Name:</strong> {selectedProduct.name}</p>
                            <p><strong>Category:</strong> {selectedProduct.category}</p>
                            <p><strong>Available Quantity:</strong> {selectedProduct.quantity}</p>
                            <p><strong>Description:</strong> {selectedProduct.description}</p>
                            <p><strong>Price per Unit:</strong> ₹{selectedProduct.price}</p>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1">Quantity to Sell:</label>
                            <input type="number" min="1" value={sellQuantity} onChange={handleQuantityChange} className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1" />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                        <div className="mt-4">
                            <p className="text-sm">Total Price: <span className="font-semibold">₹{totalPrice}</span></p>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 text-sm hover:bg-gray-400" >
                                Cancel
                            </button>
                            <button disabled={!sellQuantity || error} onClick={handleSellConfirm} className="px-4 py-2 rounded bg-green-500 text-white text-sm hover:bg-green-600 disabled:opacity-50">
                                Confirm Sell
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SellProduct
