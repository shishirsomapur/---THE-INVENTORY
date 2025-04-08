const express = require('express')
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library')
const productRoutes = require('./routes/ProductRoutes')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use(cors({
  origin: 'https://the-inventory-jmb2.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const client = new OAuth2Client('309023904476-uupr12jogp9t41s4cdc0bsl1ve6najuu.apps.googleusercontent.com')
app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '309023904476-uupr12jogp9t41s4cdc0bsl1ve6najuu.apps.googleusercontent.com',
      })
      const payload = ticket.getPayload()
      console.log("Verified User:", payload)
  
      res.status(200).json({ message: "Login successful", user: payload })
    } catch (err) {
      console.error(err)
      res.status(401).json({ message: "Unauthorized" })
    }
  })
  
app.use('/api', productRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})