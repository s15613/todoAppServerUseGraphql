const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')
const Todo = require('./models/Todo')

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URI,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
	.then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
    return { Todo }
    }
})

server.applyMiddleware({ app })

app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
)