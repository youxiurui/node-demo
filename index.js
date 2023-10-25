const express=require('express')
const app=new express()
const router=require('./router/index.js')
// 引入模块，使其能够解析post请求的body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router.login)
app.use(router.note)

router.note()
app.use((req, res) => {
  res.status(404)
  res.send("<h1>您访问的地址已被外星人劫持！</h1>")
})

const PORT = 8000
app.listen(PORT,()=>{
    console.log(`服务器启动了，端口号为${PORT}`)
})