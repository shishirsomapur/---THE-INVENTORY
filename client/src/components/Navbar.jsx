import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import Login from './Login'
import { IoIosLogIn } from "react-icons/io"
import { FaCheckCircle } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi"
import { useState } from 'react'

const Navbar = () => {
    const navigate = useNavigate()
    const { isAuthenticated, showLoginModal, setShowLoginModal } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleProtectedRoute = (path) => {
        if (isAuthenticated) {
            navigate(path)
            setMenuOpen(false)
        } else {
            setShowLoginModal(true)
        }
    }

    return (
        <>
            <div className="flex justify-between items-center shadow pl-3 pr-3 fixed w-screen bg-white z-50 h-16">
                <div className='flex flex-col items-center'>
                    <img className="h-10 w-10" src="/logo-black.png" alt="logo" />
                    <p className='text-[10px]'>ಗೋದಾಮು - THE INVENTORY</p>
                </div>

                <ul className="hidden md:flex items-center space-x-8">
                    <li className="font-semibold cursor-pointer" onClick={() => navigate("/")}>
                        Products Management
                    </li>
                    <li className="font-semibold cursor-pointer" onClick={() => handleProtectedRoute("/revenue")}>
                        Stock Overview
                    </li>
                    <li className="font-semibold cursor-pointer" onClick={() => handleProtectedRoute("/sell-product")}>
                        Sell Products
                    </li>
                </ul>

                <div className="hidden md:block">
                    {isAuthenticated ? (
                        <button disabled className="flex items-center bg-blue-400 text-white px-4 py-2 rounded cursor-default opacity-90">
                            Logged in <FaCheckCircle className='ml-2' />
                        </button>
                    ) : (
                        <button onClick={() => setShowLoginModal(true)} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Login <IoIosLogIn className="ml-2" />
                        </button>
                    )}
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
                        <GiHamburgerMenu />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow z-40 flex flex-col items-center space-y-4 py-4">
                    <p className="font-semibold cursor-pointer" onClick={() => { navigate("/"); setMenuOpen(false) }}>
                        Products Management
                    </p>
                    <p className="font-semibold cursor-pointer" onClick={() => handleProtectedRoute("/revenue")}>
                        Stock Overview
                    </p>
                    <p className="font-semibold cursor-pointer" onClick={() => handleProtectedRoute("/sell-product")}>
                        Sell Products
                    </p>
                    {isAuthenticated ? (
                        <button disabled className="flex items-center bg-blue-400 text-white px-4 py-2 rounded cursor-default opacity-90">
                            Logged in <FaCheckCircle className='ml-2' />
                        </button>
                    ) : (
                        <button onClick={() => { setShowLoginModal(true); setMenuOpen(false) }} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Login <IoIosLogIn className="ml-2" />
                        </button>
                    )}
                </div>
            )}

            {showLoginModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm relative">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4 text-center">Sign in with Google</h2>
                        <Login />
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
