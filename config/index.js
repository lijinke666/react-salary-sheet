const mode = process.env.NODE_ENV || "DEV"

//前后端 开发环境 生产环境  host port 配置

const options = {
    HOST: mode == "DEV" ? "http://localhost" : "/",
    PORT: 666,
    serverPORT:888,
    staticPath: __dirname + '/../public',
}
options.port = mode === "DEV" ?  ":" + options.PORT : ""

module.exports = options