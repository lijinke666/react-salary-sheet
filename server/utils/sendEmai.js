const nodemailer = require("nodemailer") //发邮件
const debug = require('debug')('utils-sendEmail')
const {AUTHCODE,defaultEmailTitle,adminEmail,emailService} = require("../../config")

module.exports = {
    sendEmail( options = {} ) {
        let defaultOptions = {
            from: adminEmail,
            to: "jinke@pokerlegend.cn",
            subject: defaultEmailTitle,
            pass: AUTHCODE,
            html: "<p>无内容</p>"
        }
        let currentOptions = Object.assign({}, defaultOptions, options)
        const { from, to, subject, pass, html } = currentOptions
        const mailTransport = nodemailer.createTransport({
            service: emailService,
            auth: {
                user: from,                                     //qq邮箱账户
                pass,                      //这里不是登录密码  而是 安全授权密码
            }
        })

        const mailOptions = {
            from,           //发件人  必须和auth 认证用户名一致
            to,      //收件人
            subject,          //邮件标题
            html,                           //邮件内容可以嵌入  html代码 图片都可以
            // generateTextFromHtml:true              //将html转换为文本
        }
        return new Promise((res,rej)=>{
            mailTransport.sendMail(mailOptions, (err, { messageId, response }) => {
                if (err) {
                    debug('邮件发送失败')
                    rej(err)
                }
                debug(`邮件发送成功!`, messageId, response)
                res()
            })
        })
    }
}
