//依赖
const express = require('express')
const path = require("path")
const debug = require('debug')('server')
const bodyParser = require('body-parser')
const app = express()
const http = require("http").createServer(app)
const fs = require('fs')
const cors = require('cors')
const { serverPORT } = require('./config')
const { version, name } = require('./package.json')
const writeIndex = require('./server/utils/writeIndex')

//中间键部分
app.use(express.static(`${__dirname}/public`));
// 转换 application/json
app.use(bodyParser.json())
// 转换 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())
//将打包的dist/index.html  写入到  public/index.html
writeIndex();
//端口启动部分
app.set('port', process.env.PORT || serverPORT);
const port = app.get('port')
//路由
app.get("/", (req, res, next) => {
    debug("PortalApp start");
    next();
})

//api部分
app.use('/excel', require("./server/api/excel"))

const serverRuningInfo = `
    =============== [ ${name}  ] ===============
    =============== [ v.${version} ] ================
    =============== [ port : ${port} ] ============== 
                        :)
`
http.listen(port, () => debug(serverRuningInfo))

