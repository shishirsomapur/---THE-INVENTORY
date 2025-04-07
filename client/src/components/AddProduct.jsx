import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const navigate = useNavigate()
    const [pName, setPName] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const [pNameError, setPNameError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)

    const modalRef = useRef(null)

    const closeModal = () => navigate("/")

    const assignProductName = (e) => {
        setPName(e.target.value)
        setPNameError(false)
    }

    const assignCategory = (e) => {
        setCategory(e.target.value)
        setCategoryError(false)
    }

    const assignQuantity = (e) => {
        setQuantity(e.target.value)
        setQuantityError(false)
    }

    const assignPrice = (e) => {
        setPrice(e.target.value)
        setPriceError(false)
    }

    const assignDescription = (e) => {
        setDescription(e.target.value)
        setDescriptionError(false)
    }

    const validateForm = () => {
        let isValid = true

        if (pName === "") {
            setPNameError(true)
            isValid = false
        }

        if (category === "") {
            setCategoryError(true)
            isValid = false
        }

        if (quantity === "") {
            setQuantityError(true)
            isValid = false
        }

        if (price === "") {
            setPriceError(true)
            isValid = false
        }

        if (description === "") {
            setDescriptionError(true)
            isValid = false
        }

        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            try {
                const token = localStorage.getItem("token")
                const url = `https://the-inventory-xnby.onrender.com/api/products/`
                const headers = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                const requestBody = {
                    name: pName,
                    category,
                    quantity,
                    price,
                    description
                }

                await axios.post(url, requestBody, headers)

                setPName('')
                setCategory('')
                setQuantity('')
                setPrice('')
                setDescription('')
                alert("Product added successfully!")
                closeModal()
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-6 rounded-xl shadow-xl relative"
            >
                <button className="absolute top-2 right-3 text-xl" onClick={closeModal}>✖</button>
                <h2 className="text-lg font-semibold text-center mb-5">Add New Product</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="pname" className="block mb-1 font-medium">Product Name</label>
                        <input
                            id="pname"
                            type="text"
                            value={pName}
                            onChange={assignProductName}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {pNameError && <p className="text-red-500 text-xs mt-1">*Product name is required</p>}
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-1 font-medium">Category</label>
                        <input
                            id="category"
                            type="text"
                            value={category}
                            onChange={assignCategory}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {categoryError && <p className="text-red-500 text-xs mt-1">*Category is required</p>}
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block mb-1 font-medium">Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            min={0}
                            value={quantity}
                            onChange={assignQuantity}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {quantityError && <p className="text-red-500 text-xs mt-1">*Quantity is required</p>}
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-1 font-medium">Price</label>
                        <input
                            id="price"
                            type="number"
                            min={0}
                            value={price}
                            onChange={assignPrice}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {priceError && <p className="text-red-500 text-xs mt-1">*Price is required</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={assignDescription}
                            className="w-full border px-3 py-2 rounded h-24 resize-none"
                        />
                        {descriptionError && <p className="text-red-500 text-xs mt-1">*Description is required</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
