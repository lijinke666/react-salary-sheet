import helper from "libs/helper"
export const GET_EXCEL_INFO = "get_excel_info"
export const SEND_EMAIL = "send_email"
import swal from "sweetalert"

export default function (formData, cb) {
    return async function (dispatch) {
        try {
            const excelInfo = await helper.postJson('/excel/getExcelInfo/', formData, true)
            dispatch({
                type: GET_EXCEL_INFO,
                excelInfo
            })
        } catch (error) {
            swal('excel表读取失败', error.message || "", 'error')
        }
        cb && cb()
    }
}

export function sendEmail(emailTitle, sendEmailTime, cb) {
    return async function (dispatch) {
        try {
            const successUsers = await helper.postJson('/excel/sendEmail', { emailTitle, sendEmailTime })
            dispatch({
                type: SEND_EMAIL,
                successUsers
            })
            cb && cb(successUsers)
        } catch (error) {
            swal('邮件发送失败', error.message || "", 'error')
        }
    }
}