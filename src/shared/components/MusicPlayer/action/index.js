import helper from "libs/helper"
export const UPLOAD_MUSIC = "upload_music"

export default function (formData) {
    //这里的formData就是组件调用action传的参数
    return async function (dispatch) {
        const audioFile = await helper.postJson('/music/uploadMusic/', formData, true)
        if (audioFile && audioFile.success) {
            dispatch({
                type: UPLOAD_MUSIC,
                audioFile: audioFile.data
            })
        }
    }
}