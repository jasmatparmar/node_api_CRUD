const express = require("express")
const app = express()

//route
app.get("/", (req, res) =>{
    res.send('Hello node Api')
} )

app.listen(3000, () => {
    console.log(`API running on port 3000`)
})