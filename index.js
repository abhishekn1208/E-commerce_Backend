const express = require('express')
const paymentRouter = require('./routes/payment.route')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/health',(req,res)=>{
    res.send({message : "All Good!!"})
})

app.use('/api',paymentRouter)

app.listen(3000,()=>{
    console.log(`App is listening on the port: ${3000}`)
})