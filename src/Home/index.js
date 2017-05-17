import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import Button from "shared/components/Button"
import { Link } from "react-router"
import classNames from "classnames"
import uploadExcel, { sendEmail } from "./action"

import "./styles.less"

@connect(
    ({ ExcelAction }) => ({
        excelInfo: ExcelAction.excelInfo
    }),
    (dispatch) => (
        bindActionCreators({
            uploadExcel,
            sendEmail
        }, dispatch)
    )
)

export default class Home extends React.Component {
    state = {
        excelReady: false,   //表格是否能上传
        excelInfo: [],
        sendEmailReady: false,
        emailTile: undefined,
        activeType: "one"
    }
    constructor(props) {
        super(props)
    }
    render() {
        const { excelInfo, excelReady, sendEmailReady, activeType } = this.state
        const { excelInfo: excelResult } = this.props

        // const thead = excelResult && Object.keys(excelResult[0]) || []
        // console.log(thead);
        return (
            <div key="home">
                <main className="content" key="content">
                    <Container className="home">
                        <h1 className="title">
                            <span className={classNames({ "active": activeType === "one" })}>1.选择工资条excel(确保格式正确)  <span>>></span></span>
                            <span className={classNames({ "active": activeType === "two" })}> 2.上传工资条(确认无误) <span>>></span> </span>
                            <span className={classNames({ "active": activeType === "three" })}>3.发送邮件(填写邮件标题)</span>
                        </h1>
                        <form method="post" name="upload-excel-form" encType="multipart/form-data" className="upload-excel-form">
                            <input type="file" name="excel" ref="excel" className="hidden excle-origin-btn" onChange={this.selectExcel} />
                            <Button type="info" onClick={this.clickFileBtn}>选择工资表</Button>
                            {
                                excelReady
                                    ? <Button className="home-btn" htmlType="button" type="primary" onClick={this.uploadExcel}>上传工资表</Button>
                                    : <Button className="home-btn" htmlType="button" type="error" onClick={() => alert('请选择工资表')} >未选择工资表</Button>
                            }

                            <ol className="none">
                                {
                                    excelInfo.length >= 1
                                        ? excelInfo.map((item, i) => {
                                            let { size, name } = item
                                            return (
                                                <li key={i} className="item">【Excel名字】：<strong>{name}</strong> <span className="fg"></span> {size}</li>
                                            )
                                        })
                                        : <h2>未选择工资表</h2>
                                }
                                <li></li>
                            </ol>
                            {
                                excelResult && excelResult.length >= 1
                                    ? (
                                        <div>
                                            <hr />
                                            <h4 className="title center">确认工资条信息</h4>
                                            <table className="table">
                                                <thead>

                                                    {/*<tr key={`thead`}>
                                                    {
                                                        thead.map((name, index) => {
                                                            return (
                                                                <td>{name}</td>

                                                            )
                                                        })
                                                    }
                                                </tr>*/}

                                                </thead>
                                                <tbody>
                                                    {
                                                        excelResult.map((item, index) => {
                                                            let key = Object.keys(item)[index]
                                                            console.log(key);
                                                            return (
                                                                <tr key={`tbody${index}`}>
                                                                    <td>{item["id"]}</td>
                                                                    <td>{item["姓名"]}</td>
                                                                    <td>{item['工作邮箱']}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            {
                                                sendEmailReady
                                                    ? (
                                                        <div className="send-email-btn">
                                                            <input type="text" onChange={(e) => this.setState({ emailTile: e.target.value })} placeholder="邮件标题: tip 不填则使用默认标题 [当前月份+员工名字+工资表]" />
                                                            <Button type="warning" onClick={this.sendEmail}>确认发送邮件</Button>
                                                        </div>

                                                    )
                                                    : undefined
                                            }

                                        </div>
                                    )
                                    : excelResult && excelResult.code && alert(`${excelResult.message}:(`) && this.setState({ sendEmailReady: false })

                            }
                        </form>
                    </Container>
                </main>
            </div>
        )
    }
    sendEmail = () => {
        this.props.sendEmail()
    }
    //上传工资表
    uploadExcel = () => {
        const formEle = this.dom.querySelector('.upload-excel-form')
        const formData = new FormData(formEle)
        const { uploadExcel } = this.props
        uploadExcel(formData)
        this.setState({ sendEmailReady: true,activeType:"three" })
    }
    clickFileBtn = () => {
        const fileBtn = this.dom.querySelector('.excle-origin-btn')
        fileBtn.click()
    }
    selectExcel = () => {
        var _this = this
        const files = Array.from(this.refs.excel.files);
        let req = ""
        files.forEach((file) => {
            let { type, name, size } = file;
            /.*\.xls$/.test(name) ? req = /^application\/vnd\.ms-excel$/ig : req = /^application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet$/ig
            //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
            if (!req.test(type)) {
                return alert('错误的的文件类型,请上传xls 或 xlsx格式的文件')
            }
            const reader = new FileReader();
            reader.onprogress = () => {
                console.debug(`${name}读取中,请稍后`);
            };
            reader.onabort = () => {
                this.setState({
                    excelReady: false,
                })
                alert(`${name}读取中断,请重试`)
            };
            reader.onerror = () => {
                this.setState({
                    excelReady: false
                })
                alert(`${name}读取失败`, 请重试)
                console.debug(`${name}读取失败!`)
            };
            reader.onload = function () {
                console.debug(`${name}读取成功,文件大小：${size / 1024}KB`)
                const result = this.result;        //读取失败时  null   否则就是读取的结果
                _this.setState({
                    excelReady: true,
                    activeType:"two",
                    excelInfo: [
                        {
                            name,
                            size: `${~~(size / 1024)}kb`
                        }]
                })
            }
            reader.readAsDataURL(file);      //base64
        })
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
    }
}
