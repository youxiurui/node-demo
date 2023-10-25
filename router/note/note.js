const SMSClient = require('@alicloud/sms-sdk')
const cron = require('node-cron')

const accessKeyId = 'LTAI5tFwY67LrZYZDaHtubHC'
const secretAccessKey = 'NeLWii4HUcIcNja61gTye5aIazRhNL'
const SignName = 'youxiurui'
const TemplateCode = 'SMS_272505805'
const PhoneNumbers = '15823327754'
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
module.exports = note