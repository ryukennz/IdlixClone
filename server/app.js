require('dotenv').config();

require('./db/mongoDbConnection');

const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors');
const errorHandlers = require('./middlewares/errorHandlers');
const router = require('./routers');

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/api', router)

app.use(errorHandlers)


app.listen(port, () => {
    console.log(`Example app listening on port ${port} 🚀`)
})