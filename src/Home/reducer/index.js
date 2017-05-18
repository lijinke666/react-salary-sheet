import {GET_EXCEL_INFO,SEND_EMAIL} from "../action"
const nameInitialState = {}
export default function (state = nameInitialState, action) {
    const {type} = action;
    switch (type) {
        case GET_EXCEL_INFO:
        if(action.excelInfo.success === 1){
            return {
                ...state,
                excelInfo:action.excelInfo.result
            }
        }else{
            return {
                ...state,
                excelInfo:{
                    code:500,
                    message:"上传excel表失败!"
                }
            }
        }
        case SEND_EMAIL:
            return {
                ...state,
                successUsers:action.successUsers
            }
        default:
            return state
    }
}