import React, { Component } from 'react';
import { CardContent, CardActions, Card, Button, Typography, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { withRouter } from 'react-router-dom';

class AudioCard extends Component {
    goToRecording(recording) {
        this.props.history.push(`/EditAudio/${recording.id}`);
    }

    playAudio() {
        this.refs["audioElement"].play();
    }

    stopAudio() {
        this.refs["audioElement"].pause(); 
        this.refs["audioElement"].currentTime = 0;
    }
    
    render() {
        return (
            <Card style={{ width: "200px" }}>
                <div style={{ textAlign: "center", marginTop: "1%" }}>
                    <audio 
                        src={URL.createObjectURL(this.props.recording.src)} 
                        ref="audioElement"    
                    />
                    <IconButton aria-label="Play" onClick={this.playAudio.bind(this)}>
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton aria-label="stop" onClick={this.stopAudio.bind(this)}>
                        <StopIcon />
                    </IconButton>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h4">
                        Recording {(this.props.index + 1)} of {this.props.audioRecordingsLength}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" id="goToRecording" onClick={this.goToRecording.bind(this, this.props.recording)}>
                        View/Edit
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(AudioCard);