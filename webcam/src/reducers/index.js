import { Types } from '../constants/Types';

const initialState = {
    isEditing: false,
    photos: [],
    audioRecordings: [],
    videoRecordings: [],
    stream: null,
    audioSrc: ""
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case Types.EditStatusChanged:
            return {
                ...state,
                isEditing: action.payload
            }
        case Types.SavePhoto:
            return {
                ...state,
                ...state.photos.push({ src: action.payload, id: state.photos.length })
            }
        case Types.SaveVideo:
            return {
                ...state,
                ...state.videoRecordings.push({ src: action.payload, id: state.videoRecordings.length })
            }
        case Types.SaveAudio:
            return {
                ...state,
                ...state.audioRecordings.push({ src: action.payload, id: state.audioRecordings.length })
            }
        case Types.SaveStream:
            return {
                ...state,
                stream: action.payload
            }
        case Types.ChangeAudioSource:
            return {
                ...state,
                audioSrc: action.payload
            }
        default:
            return state
    }
}

export default rootReducer