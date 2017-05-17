const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const debug = require('debug')('excel')
const multiparty = require('multiparty')
const xls2json = require("xls-to-json")
const {host,port,staticPath} = require("./../../config")

const email = require('../utils/sendEmai')

let excelInfo =  []
const outputJsonPath = `${staticPath}/json/excelInfo.json`

//获取工资表信息   转换成json
router.post('/getExcelInfo', async (req, res, next) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if (err) throw err
        files.excel.forEach((data,index)=>{
            let {originalFilename,path,size} = data
            debug(`[文件名:${originalFilename}] [文件大小:${size}]`)
            debug(` [文件路径:${path}]`)

            xls2json({
                input:path,
                output:outputJsonPath,
                // sheet:"test"
            },(err,result)=>{
                if(err){
                    debug('转换json失败')
                    res.send({
                        success:-1
                        })
                }
                debug(`转换json成功 路径 :[${outputJsonPath}]`)
                excelInfo = result
                console.log(excelInfo);
                res.send({
                    success:1,
                    result
                })
            })
        })
    })
})

//发送邮件
router.post('/sendEmail',(req,res,next)=>{
    const json = JSON.parse(fs.readFileSync(outputJsonPath).toString())
    console.log(json);
    json.forEach((item,i)=>{
        const key = Object.keys(item)[i]
        email.sendEmail({
            to:item["工作邮箱"],
            subject:`${item['姓名']}${new Date().getMonth()+1}月工资`,
            html:"<p>测试群发</p>"
        })
        debug(`${item['姓名']}发送成功!`)
    })
})

router.get("/test",(req,res,next)=>{
    email.sendEmail({
        to:"875084550@qq.com",
        html:"<p>小仙女哈哈</p>"
    })
})
module.exports = router