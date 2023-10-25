require('dotenv').config()
const SMSClient = require('@alicloud/sms-sdk')
const cron = require('node-cron')
const accessKeyId = '你的id'
const secretAccessKey = '你的密钥'
const SignName = '你的签名'
const TemplateCode = '你的模板代码'
const PhoneNumbers = '你的号码'

const smsClient = new SMSClient({ accessKeyId, secretAccessKey })

function sendMsg(data) {
    smsClient
        .sendSMS({
            PhoneNumbers,
            SignName,
            TemplateCode,
            TemplateParam: `{"code":'${smsCode}'}`,
        })
}

function note() {
    cron.schedule('0 22 * * *',sendMsg())
}

// note()
console.log(process.env.accessKeyId)

module.exports = note