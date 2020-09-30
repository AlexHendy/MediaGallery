import React, { Component } from 'react';
import * as Actions from "../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, Grid, Button } from '@material-ui/core';

class EditAudio extends Component {
    render() {
        const dataUrl = URL.createObjectURL(this.props.recording.src);
        return (
            <div style={{textAlign: "center", marginTop: "10px"}}>
                <audio src={dataUrl} controls={true}/>
                <br/>
                <TextField
                    id="outlined-email-input"
                    label="File Name"
                    value={this.props.name}
                    onChange={this.props.onChangeName}
                    margin="normal"
                    variant="outlined"
                />
                <div>
                    <Grid container spacing={16} justify="center">
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.props.toRoot.bind(this)}>
                                Home
                            </Button>
                            </Grid>
                            <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.props.downloadURI.bind(this, this.props.recording.src, this.props.name)}>
                                Download Photo
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        recording: state.audioRecordings[props.location.pathname.split('/')[2]],
        stream: state.stream
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAudio);