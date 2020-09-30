import React, { Component } from 'react';
import * as Actions from "../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { VideoConstraints } from '../constants/Types';
import { IconButton, CircularProgress  } from '@material-ui/core';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import CropSquare from '@material-ui/icons/CropSquare';
import driverFront from '../resources/DriverFront.svg'
import driverSide from '../resources/DriverSide.svg'
import driverRear from '../resources/DriverRear.svg'
import rear from '../resources/Rear.svg'
import passengerRear from '../resources/PassengerRear.svg'
import passengerSide from '../resources/PassengerSide.svg'
import passengerFront from '../resources/PassengerFront.svg'
import front from '../resources/Front.svg'

class CaptureVideo extends Component {
    constructor(props) {
        super(props)

        this.state= {
            hasVideoLoaded: false,
            mediaRecorder: null,
            isRecording: false,
            overlay: driverFront
        }
    }

    componentDidMount(){
        this.playVideo();
    }

    componentDidUpdate(prevProps){
        if (this.props.stream !== prevProps.stream){
            this.playVideo();
        }      
    }
    
    playVideo() {
        if (!this.props.stream){
            this.props.actions.OpenMedia(VideoConstraints, this.props.history.push);
            return;
        }

        this.refs["videoOverlay"].onloadedmetadata = () => { this.setState({ hasVideoLoaded: true }) }
        this.refs["videoOverlay"].srcObject = this.props.stream;
        this.refs["videoOverlay"].setAttribute("playsinline", true);
        this.refs["videoOverlay"].addEventListener('click', this.focus.bind(this), false);
        this.refs["videoOverlay"].play();

        this.setState({ mediaRecorder: new MediaRecorder(this.props.stream, { type: 'video/webm' }) }); 
    }

    focus() {
        const track = this.props.stream.getVideoTracks()[0];
        console.log("focused");
        track.applyConstraints({focusMode: 'manual'})
        console.log(track.getSettings());
        console.log(track.getCapabilities());
    }
    
    recordVideo() {
        if (this.state.mediaRecorder.state === "recording") {
            this.state.mediaRecorder.stop();
            this.setState({isRecording: false})
            return;
        }
        else {
            this.setState({isRecording: true})
        }

        let chunks = [];
        this.state.mediaRecorder.start();
        this.state.mediaRecorder.addEventListener('dataavailable', event => {
            if (typeof event.data === 'undefined') return;
              if (event.data.size === 0) return;
              chunks.push(event.data);
            });
        this.state.mediaRecorder.addEventListener('stop', () => {
            const recording = new Blob(chunks, {
              type: 'video/webm'
            });
            this.renderRecording(recording);
            chunks = [];
          });     
          
          var overlays = [
            driverFront,
            driverSide,
            driverRear,
            rear,
            passengerRear,
            passengerSide,
            passengerFront,
            front,
        ]

        let index = 0;
        setInterval(() => {
            this.setState({overlay: overlays[index]})
            if (overlays.length - 1 <= index) {
                index = 0;
            }
            else {
                index++;
            }
        }, 2000)
    }

    renderRecording(blob) {
        const blobUrl = URL.createObjectURL(blob);
        this.submitVideo(blobUrl);
    }

    submitVideo(blobUrl) {
        this.props.actions.SaveVideo(blobUrl);
        this.props.history.push(`/EditVideo/${this.props.videoRecordings.length - 1}`);
    }

    retakeVideo() {
        this.props.actions.EditStatusChanged(false);
        this.props.actions.OpenMedia(VideoConstraints, this.props.history.push);
    }

    render() {
        const isRecording = this.state.isRecording;
        return (
            <div>
                {!this.state.hasVideoLoaded &&
                    <div style={{ textAlign: "center", height: "100%" }} id="waitAnimation">
                        <CircularProgress style={{ top: "50%" }} />
                    </div>
                }
                {!this.props.isEditing  && this.props.stream &&
                    <div className="videoContainer">
                        {isRecording &&
                            <p style={{zIndex: '9999', position: 'absolute', color: 'red', fontSize: '20px'}}>Recording...</p>
                        }
                        <video ref="videoOverlay" className="videoElement"/>
                        <div style={{height: '100%'}}>
                            <img 
                                src={this.state.overlay}
                                style={{
                                    height: '100%', 
                                    position: 'absolute', 
                                    objectFit: 'contain', 
                                    opacity: '.7', 
                                    width: '95%', 
                                    right: '5%'}}/>
                        </div>
                        
                        <IconButton style={{position:"absolute"}} className="take-photo-btn" onClick={this.recordVideo.bind(this)} >
                            {!isRecording
                                ? <PanoramaFishEyeIcon style={{ width: 60, height: 60 }} />
                                : <CropSquare style={{ width: 60, height: 60, color: 'red' }} />
                            }
                        </IconButton>
                    </div>
                }  
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isEditing: state.isEditing,
        stream: state.stream,
        videoRecordings: state.videoRecordings
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaptureVideo);