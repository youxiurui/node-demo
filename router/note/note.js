require('dotenv').config()
const nodemailer = require('nodemailer');
const SMSClient = require('@alicloud/sms-sdk')
const cron = require('node-cron')
const moment = require('moment')
const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey
const SignName = process.env.SignName
const TemplateCode = process.env.TemplateCode
const MyPhone = process.env.MyPhone
const TargetPhone = process.env.TargetPhone

const smsClient = new SMSClient({ accessKeyId, secretAccessKey })

const transporter = nodemailer.createTransport({
    service: 'gmail', // 使用的邮件服务，这里以gmail为例
    auth: {
        user: process.env.MyMail, // 你的邮箱
        pass: process.env.MyMailPsd // 你的邮箱密码
    }
})

const mailOptions = {
    from: process.env.MyMail, // 发送者
    to: process.env.TargetMail, // 接收者
    subject: '来自一只优秀瑞的提醒', // 邮件标题
    text: '记得给你亲爱的老弟买衣服裤子和袜子' // 邮件内容
}

function sendMsg() {
    cron.schedule('8 22 * * *', () => {
        note()
    })
}

// 邮件发送
function mail() {
    const formattedDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    transporter.sendMail(mailOptions, (error, info) => {
        if (err) {
            console.log(formattedDate,err)
        } else {
            console.log( formattedDate , info.response)
        }
    })
}

// 短信发送
async function note() {
    const formattedDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    try {
        const res = await smsClient
            .sendSMS({
                PhoneNumbers: TargetPhone,
                SignName,
                TemplateCode,
            })
            console.log(formattedDate,res)
    } catch (err) {
        console.log(formattedDate,err)
    }
}

module.exports = sendMsg