import { UPLOAD_MUSIC } from "../action"
const nameInitialState = {}
export default function (state = nameInitialState, action) {
    const { type, audioFile } = action;
    switch (type) {
        case UPLOAD_MUSIC:
            return {
                audioUploadFile: audioFile
            }
        default:
            return state
    }
}