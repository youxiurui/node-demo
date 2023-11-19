require('dotenv').config()
const express = require('express')
const router = express.Router()
const path = require("path")
const { v4: uuidv4 } = require('uuid')
const ONENET_DATA = Array.from(require("../../data/onenet.json"))
const { timestampToTime, asyncWrite } = require('../../util')
const product_id = process.env.product_id
const device_name = process.env.device_name
const identifier = process.env.identifier
const token_key = process.env.token_key

router.use('/', (req, res, next) => {
    console.log('++++++++++数据开始推送++++++++++')
    console.log(timestampToTime(Date.now()))
    next()
})

router.get('/onenet-verify', (req, res) => {
    console.log('----------数据推送鉴权----------')
    console.log(timestampToTime(Date.now()))
    const msg = req.query.msg
    res.send(msg)
})

router.post('/onenet-verify', (req, res) => {
    // const { wd, hzd } = JSON.parse(req.body.msg).data.params
    const wd={
        time:111,
        value:222
    }
    const hzd={
        time:111,
        value:222
    }
    const data={
        wd:{
            id:uuidv4(),
            time:timestampToTime(wd.time),
            value:wd.value
        },
        hzd:{
            id:uuidv4(),
            time:timestampToTime(hzd.time),
            value:hzd.value
        }
    }
    ONENET_DATA.push(data)
    console.log('----------数据推送接收----------')
    console.log(timestampToTime(Date.now()))
    console.log('hzd---', timestampToTime(hzd.time), hzd.value)
    console.log('wd---', timestampToTime(wd.time), wd.value)
    asyncWrite(ONENET_DATA,path.join(__dirname, '../../data/onenet.json'))
    res.status(200).send()
})

module.exports = router