import React, { Component } from 'react';
import * as Actions from "../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Typography, Button, Grid } from '@material-ui/core';

class CaptureAudio extends Component {
    state = {
        mediaRecorder: null
    }

    componentDidMount(){
        this.playAudio();
    }

    componentDidUpdate(prevProps){
        if (this.props.stream !== prevProps.stream){
            this.playAudio();
        }
    }
    
    playAudio() {
        if (!this.props.stream){
            this.props.actions.OpenMedia({audio: true}, this.props.history.push);
            return;
        }
        else if (this.props.stream.getVideoTracks().length){
            this.props.actions.ResetStream();
            this.props.actions.OpenMedia({audio: true}, this.props.history.push);
        }


        this.setState({ mediaRecorder: new MediaRecorder(this.props.stream) }); 
    }

    captureAudio() {
        this.props.actions.EditStatusChanged(true);
        this.state.mediaRecorder.start();

        const audioChunks = [];

        this.state.mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        this.state.mediaRecorder.addEventListener("stop", () => {
            this.props.actions.ChangeAudioSource(new Blob(audioChunks));
        });
    }

    stopRecording() {
        this.state.mediaRecorder.stop();
    }

    toRoot() {
        this.props.actions.ChangeAudioSource("");
        this.props.actions.ResetStream();
        this.props.history.push('/');
    }

    saveRecording() {
        this.props.actions.SaveAudio(this.props.audioSrc);
        this.props.actions.ChangeAudioSource("");
        this.props.history.push(`/EditAudio/${this.props.audioRecordings.length - 1}`);
    }

    redoRecording() {
        this.props.actions.ChangeAudioSource("");
        this.captureAudio();
    }

    render() {
        return (
            <div>
                <Typography style={{ marginTop: "3%" }} component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Record Audio
                </Typography>

                <div style={{textAlign: "center", margin: "5%"}}>
                    <Grid container spacing={16} justify="center" direction="column">
                        <Grid item>
                            {!this.props.audioSrc &&
                                <Button variant="contained"
                                    color="secondary" 
                                    onClick={this.toRoot.bind(this)}>
                                    Home
                                </Button>
                            }
                        </Grid>
                        <Grid item>
                            {this.props.stream && !this.props.audioSrc &&
                                <div>
                                    {!this.props.isEditing
                                        ? <Button variant="contained" 
                                            color="primary" 
                                            onClick={this.captureAudio.bind(this)}>
                                            Record Audio
                                        </Button>
                                        : <Button variant="contained" 
                                            color="primary" 
                                            onClick={this.stopRecording.bind(this)}>
                                            Stop
                                        </Button>
                                    }
                                </div>
                            }
                        </Grid>
                    </Grid>
                    <br />
                    {this.props.audioSrc && 
                        <div>
                            <audio style={{ margin: "2%" }} src={URL.createObjectURL(this.props.audioSrc)} controls={true}/>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <Button variant="contained" 
                                        color="secondary" 
                                        onClick={this.redoRecording.bind(this)}>
                                        Redo Recording
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" 
                                        color="primary" 
                                        onClick={this.saveRecording.bind(this)}>
                                        Save Recording
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isEditing: state.isEditing,
        stream: state.stream,
        audioRecordings: state.audioRecordings,
        audioSrc: state.audioSrc
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaptureAudio);