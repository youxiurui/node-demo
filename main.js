const express = require('express')
const app = new express()
const router = require('./router/index.js')
// 引入模块，使其能够解析post请求的body
const bodyParser = require('body-parser')
const { timestampToTime } = require('./utils/index.js')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// app.use(router.onenet)
app.use('/', (req, res, next) => {
  console.log('有人请求服务器')
  console.log(timestampToTime(Date.now()))
  next()
})

app.use((req, res) => {
  res.status(404)
  res.send("<h1>您访问的地址已被外星人劫持！</h1>")
})

const PORT = 9998
app.listen(PORT, () => {
  console.log(`服务器启动了，端口号为${PORT}`)
})