const ProductModel = require('../model/ProductModel')

exports.addProduct = async (req, res) => {
    try {
        const { productName, category, quantity, price, description } = req.body
        const ids = await ProductModel.getProductIds()
        const existingIds = ids.map(p => p.id)
        let id
        do {
            id = "PROD" + Math.round(Math.random() * 10000)
        } while (existingIds.includes(id))
        const result = await ProductModel.addProduct(id, productName, category, quantity, price, description)
        if (result.message === 'Product already availiable in the table') return res.status(409).json({ message: result.message })
        res.status(201).json({ message: result.message, productId: result.productId })
    } catch (error) {
        console.error("Error adding product: ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductModel.getProducts()
        res.status(200).json(products)
    } catch (error) {
        console.error("Error fetching products ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { productName, category, quantity, price, description } = req.body
        const id = req.params.id
        const result = await ProductModel.updateProduct(productName, category, quantity, price, description, id)
        res.status(200).json(result)
    } catch (error) {
        console.error("Error updating the product ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const result = await ProductModel.deleteProduct(id)
        res.status(200).json(result)
    } catch (error) {
        console.error("Error deleting the product ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const { productId, quantity, price, totalAmount } = req.body
        let txnId
        const txnIds = await ProductModel.getTransactionIds()
        let existingTxnIds
        if (txnIds.length != 0) existingTxnIds = txnIds.map(p => p.id)
        do {
            txnId = "TXN" + Math.round(Math.random() * 1000)
        } while (existingTxnIds != undefined && existingTxnIds.includes(txnId))
        const result = await ProductModel.addTransaction(txnId, productId, quantity, price, totalAmount)
        res.status(200).json(result)
    } catch (error) {
        console.log("error adding the transaction " + error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await ProductModel.getTransactions()
        res.status(200).json(transactions)
    } catch (error) {
        console.log("error fetching the transactions " + error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


