import { Types } from '../constants/Types';

export function EditStatusChanged(isEditing) {
    return { type: Types.EditStatusChanged, payload: isEditing }
}

export function SavePhoto(dataUrl) {
    return (dispatch) => {
        dispatch({ type: Types.SavePhoto, payload: dataUrl })
        dispatch(EditStatusChanged(false))
    }
}

export function SaveVideo(blob) {
    return (dispatch) => {
        dispatch({ type: Types.SaveVideo, payload: blob })
        dispatch(EditStatusChanged(false))
    }
}

export function SaveAudio(blob) {
    return (dispatch) => {
        dispatch({ type: Types.SaveAudio, payload: blob })
        dispatch(EditStatusChanged(false))
    }
}

export function ChangeAudioSource(src) {
    return { type: Types.ChangeAudioSource, payload: src }
}

export function OpenMedia(mediaConstraints, push) {
    return (dispatch) => {
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.getUserMedia === undefined) {
            push('/Error');
            return;
        }

        return navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then((stream) => {
                dispatch({ type: Types.SaveStream, payload: stream })
            })
            .catch((err) => {
                console.debug("Error: " + err.message);
                push('/Error');
            });
    }
}

export function ResetStream() {
    return (dispatch, getState) => {
        const stream = getState().stream;
        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop();
            });
        }
        
        dispatch({ type: Types.SaveStream, payload: null });
    }
}