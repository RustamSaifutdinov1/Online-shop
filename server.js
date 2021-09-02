const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    console.log(req.url)
    let body = req.url
    if (body == '/style.css') {
        body = fs.readFileSync('./public/style.css')
    }
    else if (body == '/script.js') {
        body = fs.readFileSync('./public/script.js')
    }
    else {
        body = fs.readFileSync('./public/index.html')
    }
    res.end(body)
})


const port = 3000
server.listen(port)

console.log(`Server started on port ${port}!`)