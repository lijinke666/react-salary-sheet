import helper from "libs/helper"
export const GET_EXCEL_INFO = "get_excel_info"
export const SEND_EMAIL = "send_email"

export default function(formData){
    return async function(dispatch){
        const excelInfo = await helper.postJson('/excel/getExcelInfo/',formData,true)
        dispatch({
            type:GET_EXCEL_INFO,
            excelInfo
        })
    }
}

export function sendEmail(emailTitle,sendEmailTime){
    return async function(dispatch){
        const successUsers = await helper.postJson('/excel/sendEmail',{emailTitle,sendEmailTime})
        dispatch({
            type:SEND_EMAIL,
            successUsers
        })
    }
}