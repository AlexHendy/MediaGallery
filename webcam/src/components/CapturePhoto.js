import React, { Component } from 'react';
import * as Actions from "../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PhotoConstraints } from '../constants/Types';
import { IconButton, Button, CircularProgress  } from '@material-ui/core';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';

class CapturePhoto extends Component {
    state= {
        hasVideoLoaded: false,
        flash: false
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
            this.props.actions.OpenMedia(PhotoConstraints, this.props.history.push);
            return;
        }
        else if (this.props.stream.getAudioTracks().length){
            this.props.actions.ResetStream();
            this.props.actions.OpenMedia(PhotoConstraints, this.props.history.push);
        }

        this.refs["videoOverlay"].onloadedmetadata = () => { this.setState({ hasVideoLoaded: true }) }
        this.refs["videoOverlay"].srcObject = this.props.stream;
        this.refs["videoOverlay"].setAttribute("playsinline", true);
        this.refs["videoOverlay"].addEventListener('click', this.focus.bind(this), false);
        this.refs["videoOverlay"].play();
    }

    flash(){
        const track = this.props.stream.getVideoTracks()[0];

        track.applyConstraints({
            advanced: [{torch: true}]
        });
    }

    stopFlash(){
        const track = this.props.stream.getVideoTracks()[0];
        track.stop();
    }

    focus() {
        const track = this.props.stream.getVideoTracks()[0];
        console.log("focused");
        track.applyConstraints({focusMode: 'manual'})
        console.log(track.getSettings());
        console.log(track.getCapabilities());
    }
    
    captureImage() {
        
        if (this.state.flash){
            this.flash();
        }

     //   setTimeout(() => { 
         
        let canvas = this.refs["imageCanvas"];
        canvas.height = this.refs["videoOverlay"].videoHeight;
        canvas.width = this.refs["videoOverlay"].videoWidth;
        canvas.getContext('2d').drawImage(this.refs["videoOverlay"], 0, 0);
        this.props.actions.EditStatusChanged(true);
        
        // if (this.state.flash){
        //     this.stopFlash();
        // }
        // }, 400);

        
    }

    submitPhoto() {
        let canvas = this.refs["imageCanvas"];
        let dataURL = canvas.toDataURL('image/png');
        this.props.actions.SavePhoto(dataURL);
        this.props.history.push(`/EditPhoto/${this.props.photos.length - 1}`);
    }

    retakePhoto() {
        this.props.actions.EditStatusChanged(false);
        this.props.actions.OpenMedia(PhotoConstraints, this.props.history.push);
    }

    flashOn(){
        this.setState({ flash: true })
    }

    render() {
        return (
            <div>
                {!this.state.hasVideoLoaded &&
                    <div style={{ textAlign: "center", height: "100%" }} id="waitAnimation">
                        <CircularProgress style={{ top: "50%" }}/>
                    </div>
                }
                {!this.props.isEditing  && this.props.stream &&
                    <div className="videoContainer">
                        <video ref="videoOverlay" className="videoElement"/>
                        <IconButton style={{position:"absolute"}} className="take-photo-btn" onClick={this.captureImage.bind(this)} >
                            <PanoramaFishEyeIcon style={{ width: 60, height: 60 }}/>
                        </IconButton>
                        <Button variant="outlined"  
                                color="secondary" 
                                className="switch"
                                onClick={this.flashOn.bind(this)}
                                >
                                Flash
                        </Button>
                    </div>
                }
                <div className={`videoContainer ${this.props.isEditing ? "" : "hide"}`}>
                    <canvas ref="imageCanvas" className="videoElement" />
                    <div className="overlayButtons">
                        <Button variant="outlined"  
                                color="primary" 
                                onClick={this.retakePhoto.bind(this)}>
                                Redo
                        </Button>
                        <Button 
                            id="submit-btn"
                            variant="outlined" 
                            color="primary" 
                            onClick={this.submitPhoto.bind(this)}>
                            Keep
                        </Button>
                    </div>
                </div>                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isEditing: state.isEditing,
        photos: state.photos,
        stream: state.stream
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CapturePhoto);