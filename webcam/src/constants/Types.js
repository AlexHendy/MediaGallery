let Types = {
    OpenMedia: "OpenMedia",
    EditStatusChanged: "EditStatusChanged",
    SavePhoto: "SavePhoto",
    SaveStream: "SaveStream",
    SaveAudio: "SaveAudio",
    SaveVideo: "SaveVideo",
    ChangeAudioSource: "ChangeAudioSource"
}

const PhotoConstraints = {
    audio: false, 
    video: { 
        focusMode: "auto",
        facingMode: "environment", 
        width: { min: 1280, ideal: 1920, max: 1920 },
        height: { min: 720, ideal: 1080, max: 1080 },
    },
    advanced : [{focusMode: "auto"}]
}

const VideoConstraints = {
    audio: true, 
    video: { 
        focusMode: "auto",
        facingMode: "environment", 
        width: { min: 1280, ideal: 1920, max: 1920 },
        height: { min: 720, ideal: 1080, max: 1080 },
    },
    advanced : [{focusMode: "auto"}]
}

const serverAddress = 'http://localhost:5000'


export { VideoConstraints, Types, PhotoConstraints, serverAddress };