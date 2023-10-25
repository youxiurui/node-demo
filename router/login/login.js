const express = require('express')
const router = express.Router()
const path=require("path")
const fs=require("fs/promises")
const USER_DATA_ARR=require("../../data/user.json")
const SMSClient = require('@alicloud/sms-sdk')

router.post('/code', (req, res) => {
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
    smsClient
        .sendSMS({
            PhoneNumbers,
            SignName,
            TemplateCode,
            TemplateParam: `{"code":'${smsCode}'}`,
        })
    // console.log(req.body)
    res.send(smsCode)
})

router.get('/code', (req, res) => {
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
    smsClient
        .sendSMS({
            PhoneNumbers,
            SignName,
            TemplateCode,
            TemplateParam: `{"code":'${smsCode}'}`,
        })
    // console.log(req.body)
    res.send(smsCode)
})

module.exports = router
