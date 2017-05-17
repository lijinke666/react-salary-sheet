import ExcelAction from "Home/reducer"

import { combineReducers } from "redux"     //reducer的合并
//TODO  组件过多之后 reducer过多 应该每一个组件一个reducer  然后全部导入到这个文件中实现reducer的拆分

const chatReducer = combineReducers({
  ExcelAction,
})

export default chatReducer
