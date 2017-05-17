const fs = require('fs')
const path = require('path')
const debug = require('debug')('writeIndex')

module.exports = function () {
    if (fs.existsSync(path.resolve(__dirname, '../../public/static'))) {
        const distIndexHtml = fs.readFileSync(path.resolve(__dirname, '../../public/static/index.html'))
        fs.writeFileSync(path.resolve(__dirname, '../../public/index.html'), distIndexHtml)
        debug('写入index.html成功');
    }

}