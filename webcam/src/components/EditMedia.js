import React, { Component } from 'react';
import * as Actions from "../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, Grid, Button } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

class EditMedia extends Component {
    state = {
        name: ""
    }

    onChangeName(event) {
        this.setState({ name: event.target.value })
    }

    downloadURI(uri, name) {
        let fileType = this.props.isPhoto ? ".png" : this.props.isVideo ? ".mp4" : ".mp3";
        let link = document.createElement("a");
        link.download = name + fileType;
        link.href = this.props.isPhoto || this.props.isVideo ? uri : (window.URL || window.webkitURL).createObjectURL(uri);;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    toRoot() {
        this.props.actions.ResetStream();
        this.props.history.push('/');
    }

    render() {
        let src = null;
        if (this.props.isPhoto) {
            src = this.props.photo.src
        }
        else if (this.props.isVideo) {
            src = this.props.video.src
        }
        else {
            src = this.props.recording.src;
        }

        return (
            <div style={{textAlign: "center", heigh:"100%", width:"100%", backgroundColor: grey[100] }}>
                {this.props.isPhoto 
                    ? <img style={{ maxHeight: "55%", maxWidth: "55%", marginTop: "20px" }} src={src} alt={this.props.photo.id}/>
                    : this.props.isVideo ? 
                        <video width="320" height="240" controls>
                            <source src={src} type='video/webm'/>
                        </video>
                    : <audio src={URL.createObjectURL(src)} controls={true}/>
                }
                <br/>
                <TextField
                    id="outlined-email-input"
                    label="File Name"
                    value={this.state.name}
                    onChange={this.onChangeName.bind(this)}
                    margin="normal"
                    variant="outlined"
                />
                <div>
                    <Grid container spacing={16} justify="center">
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.toRoot.bind(this)}>
                                Home
                            </Button>
                            </Grid>
                            <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.downloadURI.bind(this, src, this.state.name)}>
                                Download {this.props.isPhoto ? "Photo" : this.props.isVideo ? "Video" : "Audio"}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const id = props.location.pathname.split('/')[2];
    return {
        recording: state.audioRecordings[id],
        photo: state.photos[id],
        video: state.videoRecordings[id],
        stream: state.stream
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMedia);