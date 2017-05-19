const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const debug = require('debug')('excel')
const multiparty = require('multiparty')
const xls2json = require("xls-to-json")
const { host, port, staticPath, tableFields, companyName, toolInfo } = require("./../../config")

const email = require('../utils/sendEmai')

let excelInfo = []
const outputJsonPath = `${staticPath}/json/excelInfo.json`

//获取工资表信息   转换成json
router.post('/getExcelInfo', async (req, res, next) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if (err) throw err
        files.excel.forEach((data, index) => {
            let { originalFilename, path, size } = data
            debug(`[文件名:${originalFilename}] [文件大小:${size}]`)
            debug(` [文件路径:${path}]`)

            xls2json({
                input: path,
                output: outputJsonPath,
                // sheet:"test"
            }, (err, result) => {
                if (err) {
                    debug('转换json失败')
                    res.send({
                        success: -1
                    })
                }
                debug(`转换json成功 路径 :[${outputJsonPath}]`)
                excelInfo = result
                res.send({
                    success: 1,
                    result
                })
            })
        })
    })
})

//发送邮件
router.post('/sendEmail', (req, res, next) => {
    let postData = ""
    let successUser = []
    req.on('data', (data) => {
        postData += data
    })
    req.on('end', async () => {
        let tdStyle = "padding:3px 5px; text-align:center;"
        const { sendEmailTime, emailTitle } = JSON.parse(postData)
        debug('[接收到客户端数据]: ', postData)
        const jsonResult = JSON.parse(fs.readFileSync(outputJsonPath).toString())
        let fields = ""
        Object.values(tableFields).map((value) => fields += `<td style="${tdStyle}">${value}</td>`)
        
        
        for (let item of jsonResult) {
            let content = ""
            let str = ""
             Object.keys(tableFields).forEach((key)=>{
                 str += `<td style="${tdStyle}">${item[tableFields[key]]}</td>`
             })
             content += `<tr>${str}</tr>`
            const html = `<table style="margin-top:20px;border:1px solid;width:100%;">
                    <thead>
                        <tr>${fields}</tr>
                    </thead>
                    <tbody>${content}</tbody>
                </table>
                <p style=" text-align: right;margin-top:25px;">${companyName}</p>
                <p style=" text-align: right;margin:5px 0;">${toolInfo} ---${sendEmailTime}</p>`
            await email.sendEmail({
                to: item[tableFields["email"]],
                subject: `${emailTitle.replace('{name}', item[tableFields["name"]])}`,
                html: html
            })
            debug(`${item[tableFields["name"]]}发送成功!`)
            successUser.push(item[tableFields["name"]])
        }
        // setTimeout(()=>res.send(successUser),3000)
        res.send(successUser)

    })
})

module.exports = router