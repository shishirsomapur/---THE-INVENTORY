import { useState, useEffect } from "react"
import axios from "axios"
import { Bar, Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend)

const StockOverview = () => {
    const [products, setProducts] = useState([])
    const [transactions, setTransactions] = useState([])
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalItemsSold, setTotalItemsSold] = useState(0)

    useEffect(() => {
        fetchProducts()
        fetchTransactions()
    }, [])

    useEffect(() => {
        if (transactions.length > 0) {
            const revenue = transactions.reduce((acc, txn) => acc + txn.total_amount, 0)
            const itemsSold = transactions.reduce((acc, txn) => acc + txn.quantity, 0)
            setTotalRevenue(revenue)
            setTotalItemsSold(itemsSold)
        }
    }, [transactions])

    const fetchProducts = async () => {
        try {
            const res = await axios.get("https://the-inventory-xnby.onrender.com/api/products")
            setProducts(res.data)
        } catch (error) {
            console.error("Error fetching products", error)
        }
    }

    const fetchTransactions = async () => {
        try {
            const res = await axios.get("https://the-inventory-xnby.onrender.com/api/transactions")
            setTransactions(res.data)
        } catch (error) {
            console.error("Error fetching transactions", error)
        }
    }

    const stockChartData = {
        labels: products.map(p => p.name),
        datasets: [
            {
                label: "Available Stock",
                data: products.map(p => p.quantity),
                backgroundColor: "#3b82f6",
                borderRadius: 6,
                barThickness: 30,
            },
        ],
    }

    const soldProductsWithRevenue = products
        .map(p => {
            const matchingTxns = transactions.filter(t => t.product_id?.trim() === p.id?.trim())
            const totalRevenue = matchingTxns.reduce((sum, t) => sum + Number(t.total_amount || 0), 0)
            return {
                name: p.name,
                revenue: totalRevenue,
            }
        })
        .filter(p => p.revenue > 0)

    const revenueChartData = {
        labels: soldProductsWithRevenue.map(p => `${p.name} (₹${p.revenue})`),
        datasets: [
            {
                label: "Revenue (₹)",
                data: soldProductsWithRevenue.map(p => p.revenue),
                backgroundColor: [
                    "#4ade80", "#facc15", "#f87171", "#a78bfa", "#38bdf8",
                    "#f472b6", "#34d399", "#fb923c", "#93c5fd", "#fde68a"
                ],
            },
        ],
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen w-screen absolute mt-13 z-0 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Stock Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border-l-4 border-blue-500 shadow-lg rounded-xl p-5 transition hover:scale-[1.02]">
                    <h2 className="text-gray-500 text-sm">Available Products</h2>
                    <p className="text-3xl font-semibold text-gray-900">{products.length}</p>
                </div>
                <div className="bg-white border-l-4 border-green-500 shadow-lg rounded-xl p-5 transition hover:scale-[1.02]">
                    <h2 className="text-gray-500 text-sm">Total Items Sold</h2>
                    <p className="text-3xl font-semibold text-gray-900">{totalItemsSold}</p>
                </div>
                <div className="bg-white border-l-4 border-yellow-500 shadow-lg rounded-xl p-5 transition hover:scale-[1.02]">
                    <h2 className="text-gray-500 text-sm">Total Revenue</h2>
                    <p className="text-3xl font-semibold text-gray-900">₹{totalRevenue}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-md rounded-lg p-4 h-[400px] flex flex-col justify-between">
                    <h2 className="text-lg font-semibold mb-4">📦 Stock Availability</h2>
                    <div className="flex-1">
                        <Bar data={stockChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 h-[400px] flex flex-col items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">💰 Revenue per Product</h2>
                    {transactions.length === 0 ? (
                        <p className="text-gray-400 italic">No transactions yet</p>
                    ) : (
                        <Pie
                            data={revenueChartData}
                            width={300}
                            height={300}
                            options={{
                                responsive: false, 
                                maintainAspectRatio: false,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default StockOverview

