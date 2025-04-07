const db = require('../config/db')

class ProductModel {

    static async addProduct(id, productName, category, quantity, price, description) {
        const products = await ProductModel.getProducts()
        const productExists = products.some(product =>
            product.name.toLowerCase() === productName.toLowerCase()
        )

        if (productExists) return { message: "Product already availiable in the table" }

        const sql = "INSERT INTO products (id, name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?, ?)"
        const [result] = await db.execute(sql, [id, productName, category, quantity, price, description])
        return { message: "New Product added successfully", insertId: result.insertId }

    }

    static async getProducts() {
        const sql = "SELECT * FROM products WHERE is_deleted = false AND quantity > 0"
        const [rows] = await db.execute(sql)
        return rows
    }

    static async updateProduct(productName, category, quantity, price, description, id) {
        const sql = "UPDATE products SET name=?, category=?, quantity=?, price=?, description=? WHERE id=? "
        const [result] = await db.execute(sql, [productName, category, quantity, price, description, id])
        return result.affectedRows
    }

    static async deleteProduct(id) {
        const sql = "UPDATE products SET is_deleted = true WHERE id = ?"
        const [result] = await db.execute(sql, [id])
        return result.affectedRows
    }

    static async getProductIds() {
        const sql = "SELECT id FROM products"
        const [rows] = await db.execute(sql)
        return rows
    }

    static async addTransaction(txn_id, product_id, quantity, price, total_amount) {
        const sql = "INSERT INTO transactions(txn_id, product_id, quantity, price, total_amount) VALUES(?, ?, ?, ?, ?)"
        const [rows] = await db.execute(sql, [txn_id, product_id, quantity, price, total_amount])
        return { message: "Transaction added successfully" }
    }

    static async getTransactionIds() {
        const sql = "SELECT txn_id FROM transactions"
        const [rows] = await db.execute(sql)
        return rows
    }

    static async getTransactions() {
        const sql = "SELECT * FROM transactions"
        const [rows] = await db.execute(sql)
        return rows
    }

}

module.exports = ProductModel