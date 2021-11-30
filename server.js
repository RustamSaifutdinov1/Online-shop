/*const http = require('http')
const fs = require('fs');
const server = http.createServer((req, res) => {
    console.log(req.url)
    let body = 0
    const public = './public'
    try {
        body = fs.readFileSync(`${public}${req.url}`)
    } catch (e) {
        body = fs.readFileSync(`${public}/index.html`)
    }
    res.end(body)
})


const port = process.env.PORT || 3000
server.listen(port)

console.log(`Server started on port ${port}!`)*/

const express = require('express')
const fs = require('fs');
const app = express()
const bodyParser=require('body-parser')

app.use(express.static('./public'))
app.use(bodyParser.json())
app.listen(3000,()=>{
    console.log('server started')
})

app.get('/itemslist/:page',(req,res)=>{
    const page=req.params.page
    fs.readFile(`./public/database${page}.json`,'utf8',(err,data)=>{
        res.send(data)
    })
})
app.post('/itemslist',(req,res)=>{
    fs.readFile('./public/database2.json','utf8',(err,data)=>{
        const offset= 10
        const list=JSON.parse(data || '{}')
        const amountOfData=Object.keys(list).length
        const newID=offset+amountOfData+1
        const newItem = req.body
        newItem.id=newID
        list[newItem.id]=newItem
        fs.writeFile('./public/database2.json', JSON.stringify(list), (err) => {
            if (err) {
                console.log(err)
            }
            res.send(list)
        })

    })
})
