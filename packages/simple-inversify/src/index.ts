import { AController, init } from "./app"

const { app } = init([AController])
const port = 8001
app.listen(port)
console.log(`app listen at port ${port}`)
