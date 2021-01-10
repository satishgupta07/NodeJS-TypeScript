import express from 'express'
import {createConnection} from "typeorm"
import {Article} from "./entities/Article"
import {User} from "./entities/User"
import {usersRoute} from "./routes/users";
import {userRoute} from "./routes/user";
import { articlesRoute } from "./routes/articles";

const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    res.send('Hello World !')
})

app.use('/api/users', usersRoute)
app.use('/api/user', userRoute)
app.use('/api/articles', articlesRoute)

async function start() {
    await createConnection({
        type: "mysql",
        username: "conduit",
        password: "conduit",
        database: "conduit",
        entities: [Article, User],
        synchronize: true,
        // dropSchema: true, // TODO: not for production
        logging: true,
        logger: "advanced-console"
    })
    app.listen(3232, () => {
        console.log('Server started on http://localhost:3232')
    })
}

start()