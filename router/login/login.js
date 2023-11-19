const express = require('express')
const router = express.Router()
const path=require("path")
const fs=require("fs/promises")
const USER_DATA_ARR=require("../../data/user.json")
const SMSClient = require('@alicloud/sms-sdk')
const cron = require('node-cron')
const {timestampToTime}=require('../../utils')
let count=0

function resetCount() {
    cron.schedule('00 00 * * *', () => {
        count=0
    })
}

resetCount()

router.post('/code', (req, res) => {
    if(count>=10) {
        res.send({
            code: 200,
            msg: '验证码发送次数过多，每天最多10次'
        })
    }
    // 用户手机号
    let PhoneNumbers = req.body.phone
    // 阿里验证规则
    const accessKeyId = '你的id'
    const secretAccessKey = '你的密钥'
    const SignName = '你的签名'
    const TemplateCode = '你的模板代码'
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey })
    // 生成六位随机验证码
    const smsCode = Math.random().toString().slice(-6)
    try {
        smsClient
        .sendSMS({
            PhoneNumbers,
            SignName,
            TemplateCode,
            TemplateParam: `{"code":'${smsCode}'}`,
        })
        console.log('发送成功-----',timestampToTime(Date.now()))
    } catch (err) {
        console.log('发送失败-----',timestampToTime(Date.now()),err)
    }
    res.send({
        code: 200,
        data: {
            smsCode: smsCode,
            count:10-count
        }
    })
})

router.get('/code', (req, res) => {
    if(count>=10) {
        res.send({
            code: 200,
            msg: '验证码发送次数过多，每天最多10次'
        })
    }
    // 用户手机号
    //let PhoneNumbers = req.body.phone
	let PhoneNumbers = req.query.phone;
    // 阿里验证规则
    const accessKeyId = '你的id'
    const secretAccessKey = '你的密钥'
    const SignName = '你的签名'
    const TemplateCode = '你的模板代码'
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey })
    // 生成六位随机验证码
    const smsCode = Math.random().toString().slice(-6)
    try {
        smsClient
        .sendSMS({
            PhoneNumbers,
            SignName,
            TemplateCode,
            TemplateParam: `{"code":'${smsCode}'}`,
        })
        console.log('发送成功-----',timestampToTime(Date.now()))
    } catch (err) {
        console.log('发送失败-----',timestampToTime(Date.now()),err)
    }
    res.send({
        code: 200,
        data: {
            smsCode: smsCode,
            count:10-count
        }
    })
})

module.exports = router
