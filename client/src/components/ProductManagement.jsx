
import { useNavigate } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io"
import { MdModeEdit, MdDelete } from "react-icons/md"
import { useAuth } from '../components/AuthContext' 

const ProductManagement = () => {
    const navigate = useNavigate()
    const { isAuthenticated, setShowLoginModal } = useAuth()

    const handleProtectedRoute = (path) => {
        if (isAuthenticated) {
            navigate(path)
        } else {
            setShowLoginModal(true)
        }
    }

    return (
        <div className='flex flex-col items-center absolute mt-20 w-screen z-0'>
            <h1 className='text-3xl mb-4 font-medium'>Manage your Products by</h1>

            <div className='mb-4 flex'>
                <span className='mr-3 text-lg font-semibold'>Adding a new Product</span>
                <button
                    className='flex items-center border-2 p-1 rounded-md cursor-pointer'
                    onClick={() => handleProtectedRoute("/add-product")}
                >
                    <IoMdAdd />
                </button>
            </div>

            <div className='mb-4 flex'>
                <span className='mr-3 text-lg font-semibold'>Editing a Product Details</span>
                <button
                    className='flex items-center border-2 p-1 rounded-md cursor-pointer'
                    onClick={() => handleProtectedRoute("/edit-product")}
                >
                    <MdModeEdit />
                </button>
            </div>

            <div className='mb-4 flex'>
                <span className='mr-3 text-lg font-semibold'>Deleting a Product</span>
                <button
                    className='flex items-center border-2 p-1 rounded-md cursor-pointer'
                    onClick={() => handleProtectedRoute("/delete-product")}
                >
                    <MdDelete />
                </button>
            </div>
        </div>
    )
}

export default ProductManagement
